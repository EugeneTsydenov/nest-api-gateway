import { Observable } from 'rxjs';
import {
  RequestLogin,
  RequestRegister,
  RequestUpdateUser,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
  ResponseUpdateUser,
} from './grpc';

export interface IUserRepository {
  getUser(id: number): Observable<ResponseGetUser>;
  login(data: RequestLogin): Observable<ResponseLogin>;
  register(data: RequestRegister): Observable<ResponseRegister>;
  deleteUser(id: number): Observable<ResponseDeleteUser>;
  updateUser(data: RequestUpdateUser): Observable<ResponseUpdateUser>;
}
