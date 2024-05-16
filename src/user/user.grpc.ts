import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  IUserGrpcClient,
  RequestLogin,
  RequestRegister,
  RequestUpdatePassword,
  RequestUpdateUser,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
  ResponseUpdatePassword,
  ResponseUpdateUser,
} from './types/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserGrpc implements OnModuleInit, IUserGrpcClient {
  private userGrpcService: IUserGrpcClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userGrpcService =
      this.client.getService<IUserGrpcClient>('UserService');
  }

  getUser(withId: { id: number }): Observable<ResponseGetUser> {
    return this.userGrpcService.getUser(withId);
  }

  login(data: RequestLogin): Observable<ResponseLogin> {
    return this.userGrpcService.login(data);
  }

  register(data: RequestRegister): Observable<ResponseRegister> {
    return this.userGrpcService.register(data);
  }

  deleteUser(withId: { id: number }): Observable<ResponseDeleteUser> {
    return this.userGrpcService.deleteUser(withId);
  }

  updateUser(data: RequestUpdateUser): Observable<ResponseUpdateUser> {
    return this.userGrpcService.updateUser(data);
  }

  updatePassword(
    data: RequestUpdatePassword,
  ): Observable<ResponseUpdatePassword> {
    return this.userGrpcService.updatePassword(data);
  }
}
