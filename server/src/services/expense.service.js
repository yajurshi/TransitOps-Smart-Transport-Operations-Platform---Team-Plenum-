const expenseRepo = require('../repositories/expense.repository');

class ExpenseService {
    async getExpenses(page = 1, limit = 10, category = '') {
        const offset = (page - 1) * limit;
        return await expenseRepo.getAllExpenses(limit, offset, category);
    }

    async getExpenseById(id) {
        const expense = await expenseRepo.getExpenseById(id);
        if (!expense) {
            const error = new Error('Expense record not found');
            error.statusCode = 404;
            throw error;
        }
        return expense;
    }

    async createExpense(data) {
        const expenseId = await expenseRepo.createExpense({
            category: data.category,
            amount: data.amount,
            description: data.description || null,
            date: data.date || new Date().toISOString()
        });

        return await this.getExpenseById(expenseId);
    }

    async deleteExpense(id) {
        await this.getExpenseById(id);
        await expenseRepo.deleteExpense(id);
    }
}

module.exports = new ExpenseService();
