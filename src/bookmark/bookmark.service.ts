import { Injectable, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark } from './bookmark.model';
import { Model } from 'mongoose';

@Injectable()
// BookmarkProvider = BookmarkService
export class BookmarkProvider {
  private bookmark: Bookmark[] = [];

  constructor(
    @InjectModel('Bookmark') private readonly bookmarkModel: Model<Bookmark>,
  ) {}

  async insertBookmark(title: string, desc: string, price: number) {
    const newBookmark = new this.bookmarkModel({
      title,
      description: desc,
      price,
    });
    const result = await newBookmark.save();
    console.log(result);
    return result;
  }

  async get(id: string): Promise<Bookmark> {
    return await this.bookmarkModel.findById(id);
  }

  async getAll() {
    return await this.bookmarkModel.find();
  }

  async updateBookmark(
    id: string,
    title: string,
    description: string,
    price: number,
  ): Promise<Bookmark> {
    const book = await this.bookmarkModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
    });
    return book;
  }

  async delete(id: string): Promise<Bookmark> {
    return this.bookmarkModel.findByIdAndDelete(id);
  }
}
