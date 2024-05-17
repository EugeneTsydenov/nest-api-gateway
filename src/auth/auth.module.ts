import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserGrpc } from '../user/user.grpc';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'node:path';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserGrpc],
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
