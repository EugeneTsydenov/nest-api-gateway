import { Observable } from 'rxjs';
import {
  RequestLogin,
  RequestRegister,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
} from './grpc';

export interface IUserRepository {
  getUser(id: number): Observable<ResponseGetUser>;
  login(data: RequestLogin): Observable<ResponseLogin>;
  register(data: RequestRegister): Observable<ResponseRegister>;
  deleteUser(id: number): Observable<ResponseDeleteUser>;
}
