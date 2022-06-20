import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { url } from 'inspector';
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

  // @Get(':id')
  // async get(@Param('id') id: string) {
  //   return await this.bookmarkService.get(id);
  // }

  @Get()
  async getAll() {
    return await this.bookmarkService.getAll();
  }

  @Get('/urltopdf')
  async getUrl() {
    const url =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    return url;
  }

  //const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  //updating
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') bookTitle: string,
    @Body('description') bookDescription: string,
    @Body('price') bookPrice: number,
  ) {
    try {
      const updatedBookmark = await this.bookmarkService.updateBookmark(
        id,
        bookTitle,
        bookDescription,
        bookPrice,
      );
      return updatedBookmark;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.bookmarkService.delete(id);
  }
}
