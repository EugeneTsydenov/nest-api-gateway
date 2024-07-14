import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'node:path';
import { UserGrpc } from './user.grpc';

@Module({
  controllers: [UserController],
  providers: [UserService, UserGrpc],
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
export class UserModule {}
