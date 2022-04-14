import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    try {
      const bookmark = await this.bookmarkService.insertBookmark(
        bookTitle,
        bookDesc,
        bookPrice,
      );
      return bookmark;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.bookmarkService.get(id);
  }

  @Get()
  async getAll() {
    return await this.bookmarkService.getAll();
  }
  // @Put(':id')
  // async update(@Param('id') id: string) {
  //   return await this.bookmarkService.update();
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bookmarkService.delete(id);
  }
}
