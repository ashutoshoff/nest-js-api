import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import e from 'express';

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

  async findUser(email: string, password: string) {
    const findUser = await this.userModel.findOne({
      email: email,
    });
    return findUser;
  }
}
