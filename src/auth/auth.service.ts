import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserInput } from '../user/entity/user.entity';
import { map, Observable } from 'rxjs';
import { ResponseLogin, ResponseRegister } from '../user/types/grpc';
import { UserGrpc } from '../user/user.grpc';
import {
  IAuthService,
  JwtPayload,
  ResponseObservableLogin,
  TokensPair,
} from './types/serivce';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'node:process';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userGrpc: UserGrpc,
    private jwtService: JwtService,
  ) {}

  login(data: UserInput): ResponseObservableLogin {
    return this.userGrpc.login(data).pipe(
      map(async (response: ResponseLogin) => {
        if (response.code === 200) {
          const { access, refresh } = await this.generateAccessAndRefreshTokens(
            response.id.low,
          );
          await this.authRepository.saveToken({
            userId: response.id.low,
            jti: refresh.jti,
            isRevoked: false,
          });
          return {
            message: response.message,
            code: response.code,
            tokens: {
              accessToken: access.token,
              refreshToken: refresh.token,
            },
          };
        }

        throw new UnauthorizedException(response.message);
      }),
    );
  }

  register(data: UserInput): Observable<ResponseRegister> {
    return this.userGrpc.register(data);
  }

  async generateAccessAndRefreshTokens(userId: number): Promise<TokensPair> {
    const payload = {
      userId,
    };

    const accessJti = uuidv4();
    const accessOptions: JwtSignOptions = {
      privateKey: process.env.ACCESS_SECRET_KEY,
      jwtid: accessJti,
      expiresIn: '15m',
    };
    const accessToken = await this.jwtService.signAsync(payload, accessOptions);

    const refreshJti = uuidv4();
    const refreshOptions: JwtSignOptions = {
      privateKey: process.env.REFRESH_SECRET_KEY,
      jwtid: refreshJti,
      expiresIn: '15m',
    };
    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshOptions,
    );

    return {
      access: { token: accessToken, jti: accessJti },
      refresh: { token: refreshToken, jti: refreshJti },
    };
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: process.env.ACCESS_SECRET_KEY,
    });
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: process.env.REFRESH_SECRET_KEY,
    });
  }
}
