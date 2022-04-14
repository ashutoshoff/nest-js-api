import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async addExpense(
    @Body('item') eitem: string,
    @Body('quantity') equantity: number,
    @Body('price') eprice: number,
  ) {
    try {
      const expense = await this.expenseService.addExpense(
        eitem,
        equantity,
        eprice,
      );
      return expense;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async getAll() {
    return await this.expenseService.getAll();
  }

  @Delete()
  async deleteItem(@Param('id') id: string) {
    return await this.expenseService.deleteItem(id);
  }
}
