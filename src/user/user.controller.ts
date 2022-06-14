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
      const hashedPass = await this.userService.hashedPassword(password);
      const user = await this.userService.addUser(username, email, hashedPass);
      return { error: false, msg: 'Account created successfully' };
    } catch (error) {
      throw error;
    }
  }

  @Post('/getUser')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<object> {
    try {
      // const hashedPass = await this.userService.hashedPassword(password);
      const finduser = await this.userService.validateUser(email, password);
      if (finduser) {
        console.log(finduser.user);
        return { error: false, msg: 'Logged in Success', finduser };
      } else return { error: true, msg: 'Login fail' };
    } catch (error) {
      throw error;
    }
  }
}
