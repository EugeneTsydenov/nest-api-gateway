import { Injectable } from '@nestjs/common';
import { UserInput } from '../user/entity/user.entity';
import { ResponseObservableLogin } from '../user/types/service';
import { map } from 'rxjs';
import { ResponseLogin } from '../user/types/grpc';
import { UserGrpc } from '../user/user.grpc';

@Injectable()
export class AuthService {
  constructor(private readonly userGrpc: UserGrpc) {}

  login(userData: UserInput): ResponseObservableLogin {
    return this.userGrpc.login(userData).pipe(
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

  register(userData: UserInput) {
    return this.userGrpc.register(userData);
  }
}
