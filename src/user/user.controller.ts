import { Controller, Delete, Get, Param, Put, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { BASE_PATH } from '../constants/constants';
import { Response, Request } from 'express';

@Controller(`${BASE_PATH}/users`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number, @Res() response: Response) {
    this.userService.getUser(id).subscribe((res) => {
      response
        .status(res.code)
        .json({ message: res.message, userData: res.userData });
    });
  }

  @Delete(':id')
  delete(@Req() req: Request, @Res() response: Response) {
    const { id } = req.body;
    this.userService.deleteUser(id).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Put(':id')
  updateUser(@Req() req: Request, @Res() response: Response) {
    const data = req.body;
    this.userService.updateUser(data).subscribe((res) => {
      response
        .status(res.code)
        .json({ message: res.message, updatedUserData: res.updatedUserData });
    });
  }

  @Put(':id/password')
  updatePassword(@Req() req: Request, @Res() response: Response) {
    const data = req.body;
    this.userService.updatePassword(data).subscribe((res) => {
      response.status(res.code).json({ message: res.message });
    });
  }

  @Get()
  getAllUsers(@Res() response: Response) {
    this.userService.getAllUsers().subscribe((res) => {
      response.status(200).json(res);
    });
  }
}
