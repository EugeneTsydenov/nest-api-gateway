import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserGrpc } from '../user/user.grpc';

@Module({
  controllers: [AuthController, AuthRepository, UserGrpc],
  providers: [AuthService],
})
export class AuthModule {}
