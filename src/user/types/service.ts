import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import {
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
} from './grpc';
import { UserInput } from '../entity/user.entity';

export interface IUserService {
  getUser(id: number): ResponseObservableGetUser;
  login(data: UserInput): ResponseObservableLogin;
  register(data: UserInput): Observable<ResponseRegister>;
  deleteUser(id: number): Observable<ResponseDeleteUser>;
}

export type ResponseObservableGetUser = Observable<
  ResponseGetUser | { code: number; message: string; userData: UserDto }
>;

export type ResponseObservableLogin = Observable<
  ResponseLogin | { code: number; message: string; id: number }
>;
