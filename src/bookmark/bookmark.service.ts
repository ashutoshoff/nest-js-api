import { Injectable } from '@nestjs/common';
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
    return result.id;
  }
}
