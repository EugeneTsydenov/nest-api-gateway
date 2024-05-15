import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  IUserGrpcService,
  RequestLogin,
  RequestRegister,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
} from './types/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { IUserRepository } from './types/repository';
import { Observable } from 'rxjs';

@Injectable()
export class UserRepository implements OnModuleInit, IUserRepository {
  private userGrpcService: IUserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userGrpcService =
      this.client.getService<IUserGrpcService>('UserService');
  }

  getUser(id: number): Observable<ResponseGetUser> {
    return this.userGrpcService.getUser({ id });
  }

  login(data: RequestLogin): Observable<ResponseLogin> {
    return this.userGrpcService.login(data);
  }

  register(data: RequestRegister): Observable<ResponseRegister> {
    return this.userGrpcService.register(data);
  }

  deleteUser(id: number): Observable<ResponseDeleteUser> {
    return this.userGrpcService.deleteUser({ id });
  }
}
