import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IAuthRepository, SavedToken } from './types/repository';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  async saveToken(data: SavedToken): Promise<TokenEntity> {
    return this.prisma.token.create({
      data: { is_revoked: data.isRevoked, jti: data.jti, user_id: data.userId },
    });
  }

  async getToken(jti: string): Promise<TokenEntity> {
    return this.prisma.token.findFirst({
      where: {
        jti: jti,
      },
    });
  }
}
