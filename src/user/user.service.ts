import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { UserInput } from './entity/user.entity';
import {
  IUserService,
  ResponseObservableGetUser,
  ResponseObservableLogin,
  ResponseObservableUpdateUser,
} from './types/service';
import { UserRepository } from './user.repository';
import {
  RequestUpdateUser,
  ResponseDeleteUser,
  ResponseGetUser,
  ResponseLogin,
  ResponseRegister,
} from './types/grpc';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUser(id: number): ResponseObservableGetUser {
    return this.userRepository.getUser(id).pipe(
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

  login(data: UserInput): ResponseObservableLogin {
    return this.userRepository.login(data).pipe(
      map((response: ResponseLogin) => {
        if (response.code === 200) {
          return {
            message: response.message,
            code: response.code,
            id: response.id.low,
          };
        }

        return response;
      }),
    );
  }

  register(data: UserInput): Observable<ResponseRegister> {
    return this.userRepository.register(data);
  }

  deleteUser(id: number): Observable<ResponseDeleteUser> {
    return this.userRepository.deleteUser(id);
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
}
