import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { UserModule } from './user.module';
import { UserProvider } from './user.service';
import { Model } from 'mongoose';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<User>,

    private readonly userService: UserProvider,
  ) {}

  @Post('/addUser')
  async addUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const foundUser = await this.userService.getUserByEmail(email);
      if (foundUser)
        return { error: true, msg: 'User already exist with this email' };

      const user = await this.userService.addUser(username, email, password);
    } catch (error) {
      throw error;
    }
  }

  @Post('/getUser')
  async login(
    // @Request() req,
    @Body('email') email: string,
    @Body('password') password: string,
    // @Body() credential: { email: string; password: string },
    // @Res({ passthrough: false }) response: Response,
  ): Promise<object> {
    try {
      const finduser = await this.UserModel.findOne({
        email: email,
      });
      console.log(finduser);
      if (finduser) {
        //if user found check for password
        const user = this.userService.validateUser(email, password);
        return { error: false, msg: 'Logged in Success' };
      } else return { error: true, msg: 'Invalid User' };
    } catch (error) {
      throw error;
    }
  }
}
