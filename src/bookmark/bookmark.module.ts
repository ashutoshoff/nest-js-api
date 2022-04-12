import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkController } from './bookmark.controller';
import { BookmarkSchema } from './bookmark.model';
import { BookmarkProvider } from './bookmark.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bookmark', schema: BookmarkSchema }]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkProvider],
})
export class BookmarkModule {}
