import { Observable } from 'rxjs';
import {
  RequestGetUser,
  RequestLogin,
  RequestRegister,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
} from './grpc';

export interface IUserRepository {
  getUser(withId: RequestGetUser): Observable<ResponseGetUser>;
  login(data: RequestLogin): Observable<ResponseLogin>;
  register(data: RequestRegister): Observable<ResponseRegister>;
}
