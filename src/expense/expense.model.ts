import * as mongoose from 'mongoose';

// define schema for storing data in mongo db

export const ExpenseSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  price: Number,
});

export interface Expense {
  id: string;
  item: string;
  qunatity: number;
  price: number;
}
