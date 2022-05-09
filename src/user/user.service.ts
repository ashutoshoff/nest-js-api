import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
const jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserProvider {
  private user: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({
      username,
      email,
      password,
    });
    const result = await newUser.save();
    console.log(result);
    return result;
  }

  async getUserByEmail(email: string) {
    const findEmail = await this.userModel.findOne({ email: email });
    return findEmail;
  }
  async hashedPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    // console.log('Login Password: ', pass, 'Saved Password:', user.password);
    if (user && (await this.comparePassword(pass, user.password))) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.username,
        },
        process.env.SECRET,
      );
      return { user: token };
    } else {
      console.log('Invalid email or password');
    }
  }

  async comparePassword(
    providePassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const paswordIsMatched = await bcrypt.compare(
      providePassword,
      storedPassword,
    );
    return paswordIsMatched;
  }
}
