import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return { msg: ' I am signin / login' };
  }
  signup() {
    return { msg: ' I am signup ' };
  }
}
