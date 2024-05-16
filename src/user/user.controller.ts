import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BASE_PATH } from '../constants/constants';
import { Response, Request } from 'express';
import { UserInput } from './entity/user.entity';

@Controller(`${BASE_PATH}/user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id/:id')
  getUser(@Param('id') id: number, @Res() response: Response) {
    this.userService.getUser(id).subscribe((res) => {
      response
        .status(res.code)
        .json({ message: res.message, userData: res.userData });
    });
  }

  @Post('login')
  login(@Req() req: Request, @Res() response: Response) {
    const userInput: UserInput = req.body;
    this.userService.login(userInput).subscribe((res) => {
      response.status(res.code).json({ message: res.message, id: res.id });
    });
  }

  @Post('register')
  register(@Req() request: Request, @Res() response: Response) {
    const userInput: UserInput = request.body;
    this.userService.register(userInput).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Delete('delete')
  delete(@Req() req: Request, @Res() response: Response) {
    const { id } = req.body;
    this.userService.deleteUser(id).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Put('update')
  updateUser(@Req() req: Request, @Res() response: Response) {
    const data = req.body;
    this.userService.updateUser(data).subscribe((res) => {
      response
        .status(res.code)
        .json({ message: res.message, updatedUserData: res.updatedUserData });
    });
  }

  @Put('update/password')
  updatePassword(@Req() req: Request, @Res() response: Response) {
    const data = req.body;
    this.userService.updatePassword(data).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Get('all')
  getAllUsers(@Res() response: Response) {
    this.userService.getAllUsers().subscribe((res) => {
      response.status(200).json(res);
    });
  }
}
