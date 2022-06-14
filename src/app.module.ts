import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    MongooseModule.forRoot(process.env.DB),
    ExpenseModule,
  ],
})
export class AppModule {}
