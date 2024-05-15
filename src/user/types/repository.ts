import { Observable } from 'rxjs';
import {
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
} from './grpc';

export interface IUserRepository {
  getUser(id: number): Observable<ResponseGetUser>;
  login(data: RequestLogin): Observable<ResponseLogin>;
  register(data: RequestRegister): Observable<ResponseRegister>;
  deleteUser(id: number): Observable<ResponseDeleteUser>;
  updateUser(data: RequestUpdateUser): Observable<ResponseUpdateUser>;
  updatePassword(
    data: RequestUpdatePassword,
  ): Observable<ResponseUpdatePassword>;
}
