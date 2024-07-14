import { UserInput } from '../../user/entity/user.entity';
import { Response } from 'express';

export interface IAuthController {
  login(userData: UserInput, res: Response): void;
  register(userData: UserInput, res: Response): void;
}
