import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'node:path';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
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
