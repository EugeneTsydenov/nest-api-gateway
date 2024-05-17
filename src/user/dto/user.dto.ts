import { UserEntity, UserOutput } from '../entity/user.entity';
import { formatDate } from '../../utils/utils';

export class UserDto implements UserOutput {
  id: number;
  username: string;
  avatar: string;
  createdAt: string;

  constructor(userData: UserEntity) {
    this.id = userData.id.low;
    this.username = userData.username;
    this.avatar = userData.avatar;
    this.createdAt = formatDate(userData.createdAt);
  }
}
