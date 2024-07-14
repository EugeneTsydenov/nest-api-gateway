export class TokenEntity {
  id: bigint;
  user_id: bigint;
  jti: string;
  is_revoked: boolean;
  created_at: Date;
}
