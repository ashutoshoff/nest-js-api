import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserProvider } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserProvider],
})
export class UserModule {}
