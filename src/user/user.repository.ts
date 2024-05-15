import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  IUserGrpcService,
  RequestGetUser,
  RequestLogin,
  RequestRegister,
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

  getUser(withId: RequestGetUser): Observable<ResponseGetUser> {
    return this.userGrpcService.getUser(withId);
  }

  login(data: RequestLogin): Observable<ResponseLogin> {
    return this.userGrpcService.login(data);
  }

  register(data: RequestRegister): Observable<ResponseRegister> {
    return this.userGrpcService.register(data);
  }
}
