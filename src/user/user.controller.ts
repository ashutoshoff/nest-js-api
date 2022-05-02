import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserProvider } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserProvider) {}

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

  @Get('/getUser')
  async getUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.userService.findUser(email, password);
      if (user) {
        return { error: false, msg: 'Logged in Success' };
      } else return { error: true, msg: 'Invalid User' };
    } catch (error) {
      throw error;
    }
  }
}
