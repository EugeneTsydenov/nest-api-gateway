import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';
import { Long } from './types';

export interface IUserGrpcClient {
  getUser(withId: RequestGetUser): Observable<ResponseGetUser>;
  login(data: RequestLogin): Observable<ResponseLogin>;
  register(data: RequestRegister): Observable<ResponseRegister>;
  deleteUser(withId: RequestDeleteUser): Observable<ResponseDeleteUser>;
  updateUser(data: RequestUpdateUser): Observable<ResponseUpdateUser>;
  updatePassword(
    data: RequestUpdatePassword,
  ): Observable<ResponseUpdatePassword>;
  getAllUsers({}): Observable<ResponseGetAllUsers>;
}

export interface ResponseGetUser {
  userData: UserEntity;
  message: string;
  code: number;
}

export interface RequestGetUser {
  id: number;
}

export interface ResponseLogin {
  id: Long;
  message: string;
  code: number;
}

export interface RequestLogin {
  username: string;
  password: string;
}

export interface RequestRegister {
  username: string;
  password: string;
}

export interface ResponseRegister {
  message: string;
  code: number;
}

export interface RequestDeleteUser {
  id: number;
}

export interface ResponseDeleteUser {
  code: number;
  message: string;
}

export interface Field {
  username: string;
  avatar: string;
}

export interface RequestUpdateUser {
  id: number;
  updatedField: Field;
}

export interface ResponseUpdateUser {
  updatedUserData: UserEntity;
  code: number;
  message: string;
}

export interface RequestUpdatePassword {
  id: number;
  passwords: {
    old: string;
    new: string;
  };
}

export interface ResponseUpdatePassword {
  code: number;
  message: string;
}

export interface ResponseGetAllUsers {
  users: UserEntity[];
}
