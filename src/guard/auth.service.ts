import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });
    if (user && (await this.comparePassword(pass, user.password))) {
      return user;
    }
    throw new HttpException(
      'Invalid username or password',
      HttpStatus.NO_CONTENT,
    );
  }

  async login(user) {
    const payload = { user: user.username, sub: user._id };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload);
    return { accessToken, refreshToken };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
}
