import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput } from '../user/entity/user.entity';
import { BASE_PATH } from '../constants/constants';
import { Response } from 'express';

@Controller(`${BASE_PATH}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: UserInput, @Res() response: Response) {
    this.authService.register(userData).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Post('login')
  login(@Body() userData: UserInput, @Res() response: Response) {
    this.authService.login(userData).subscribe((res) => {
      response.status(res.code).json({ message: res.message, id: res.id });
    });
  }
}
