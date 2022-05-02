import * as mongoose from 'mongoose';

//Define schema for storing data in mongo db
export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
