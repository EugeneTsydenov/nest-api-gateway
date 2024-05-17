import { TokenEntity } from '../entities/token.entity';

export interface IAuthRepository {
  saveToken(data: SavedToken): Promise<TokenEntity>;
  getToken(jti: string): Promise<TokenEntity>;
}

export interface SavedToken {
  jti: string;
  userId: number;
  isRevoked: boolean;
}
