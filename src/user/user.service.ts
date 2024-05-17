import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import {
  IUserService,
  ResponseObservableGetUser,
  ResponseObservableUpdateUser,
} from './types/service';
import { UserGrpc } from './user.grpc';
import {
  RequestUpdatePassword,
  RequestUpdateUser,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseUpdatePassword,
} from './types/grpc';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserGrpc) {}

  getUser(id: number): ResponseObservableGetUser {
    return this.userRepository.getUser({ id }).pipe(
      map((response: ResponseGetUser) => {
        if (response.code === 200) {
          const userDto = new UserDto(response.userData);
          return {
            message: response.message,
            code: response.code,
            userData: userDto,
          };
        }

        return response;
      }),
    );
  }

  deleteUser(id: number): Observable<ResponseDeleteUser> {
    return this.userRepository.deleteUser({ id });
  }

  updateUser(data: RequestUpdateUser): ResponseObservableUpdateUser {
    return this.userRepository.updateUser(data).pipe(
      map((response) => {
        if (response.code === 200) {
          const userDto = new UserDto(response.updatedUserData);
          return {
            message: response.message,
            code: response.code,
            updatedUserData: userDto,
          };
        }

        return response;
      }),
    );
  }

  updatePassword(
    data: RequestUpdatePassword,
  ): Observable<ResponseUpdatePassword> {
    return this.userRepository.updatePassword(data);
  }

  getAllUsers(): Observable<{ users: UserDto[] }> {
    return this.userRepository.getAllUsers().pipe(
      map((response) => {
        const users = response.users;
        const convertedUsers: UserDto[] = [];
        for (const user of users) {
          convertedUsers.push(new UserDto(user));
        }
        return {
          users: convertedUsers,
        };
      }),
    );
  }
}
