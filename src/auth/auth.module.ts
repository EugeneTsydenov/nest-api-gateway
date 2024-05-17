import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserGrpc } from '../user/user.grpc';
import { PrismaService } from '../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'node:path';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UserGrpc, PrismaService, JwtService],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:4000',
          package: 'proto',
          protoPath: path.join(__dirname, '../../src/user/proto/user.proto'),
        },
      },
    ]),
  ],
})
export class AuthModule {}
