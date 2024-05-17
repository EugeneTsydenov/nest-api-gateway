import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import {
  RequestUpdatePassword,
  RequestUpdateUser,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseUpdatePassword,
  ResponseUpdateUser,
} from './grpc';

export interface IUserService {
  getUser(id: number): ResponseObservableGetUser;
  deleteUser(id: number): Observable<ResponseDeleteUser>;
  updateUser(data: RequestUpdateUser): ResponseObservableUpdateUser;
  updatePassword(
    data: RequestUpdatePassword,
  ): Observable<ResponseUpdatePassword>;
  getAllUsers(): Observable<{ users: UserDto[] }>;
}

export type ResponseObservableGetUser = Observable<
  ResponseGetUser | { code: number; message: string; userData: UserDto }
>;

export type ResponseObservableLogin = Observable<
  ResponseLogin | { code: number; message: string; id: number }
>;

export type ResponseObservableUpdateUser = Observable<
  | ResponseUpdateUser
  | { code: number; message: string; updatedUserData: UserDto }
>;
