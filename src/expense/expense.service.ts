import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './expense.model';

@Injectable()
export class ExpenseService {
  // constructor(
  //     @InjectModel('Bookmark') private readonly bookmarkModel: Model<Bookmark>,
  //   ) {}
  private expense: Expense[] = [];
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<Expense>,
  ) {}

  //to add expense
  async addExpense(item: string, quantity: number, price: number) {
    const newExpense = new this.expenseModel({
      item,
      quantity,
      price,
    });
    const result = await newExpense.save();
    console.log(result);
    console.log(result.qunatity);
    return result;
  }

  //To get all expenses
  async getAll() {
    return await this.expenseModel.find();
  }
  async deleteItem(id: string): Promise<Expense> {
    return await this.expenseModel.findByIdAndDelete();
  }
}
