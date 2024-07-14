import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput } from '../user/entity/user.entity';
import { BASE_PATH } from '../constants/constants';
import { IAuthController } from './types/controller';
import { Response } from 'express';

@Controller(`${BASE_PATH}/auth`)
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userData: UserInput, @Res() response: Response) {
    this.authService.login(userData).subscribe(async (res) => {
      try {
        const waitedRes = await res;
        response.cookie('refreshToken', waitedRes.tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        response.status(waitedRes.code).json({
          message: waitedRes.message,
          accessToken: waitedRes?.tokens.accessToken,
        });
      } catch (e) {
        console.log(e);
        response.status(e.status).json({ message: e.message });
      }
    });
  }

  @Post('register')
  register(@Body() userData: UserInput, @Res() response: Response) {
    this.authService.register(userData).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }
}
