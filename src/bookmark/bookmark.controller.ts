import { Body, Controller, Post } from '@nestjs/common';
import { BookmarkProvider } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkProvider) {}

  @Post()
  async addBookmark(
    @Body('title') bookTitle: string,
    @Body('description') bookDesc: string,
    @Body('price') bookPrice: number,
  ) {
    const generateId = await this.bookmarkService.insertBookmark(
      bookTitle,
      bookDesc,
      bookPrice,
    );
    return { id: generateId };
  }
}
