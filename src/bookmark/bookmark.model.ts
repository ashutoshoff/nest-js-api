import * as mongoose from 'mongoose';

// define schema for storing data in mongo db
export const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface Bookmark {
  id: string;
  title: string;
  description: string;
  price: number;
}
