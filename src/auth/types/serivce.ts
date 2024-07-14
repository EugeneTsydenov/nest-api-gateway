import { UserInput } from '../../user/entity/user.entity';
import { Observable } from 'rxjs';
import { ResponseRegister } from '../../user/types/grpc';

export interface IAuthService {
  login(userData: UserInput): ResponseObservableLogin;
  register(userData: UserInput): Observable<ResponseRegister>;
  generateAccessAndRefreshTokens(id: number): Promise<TokensPair>;
  verifyAccessToken(token: string): Promise<JwtPayload>;
  verifyRefreshToken(token: string): Promise<JwtPayload>;
}

export interface TokensPair {
  access: {
    token: string;
    jti: string;
  };
  refresh: {
    token: string;
    jti: string;
  };
}

export type ResponseObservableLogin = Observable<
  Promise<{
    code: number;
    message: string;
    tokens: { accessToken: string; refreshToken: string };
  }>
>;

export interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
  jti: number;
}
