import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bookmark'),
  ],
})
export class AppModule {}
