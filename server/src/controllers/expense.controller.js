const expenseService = require('../services/expense.service');
const { successResponse } = require('../utils/response');

class ExpenseController {
    async getExpenses(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const category = req.query.category || '';

            const result = await expenseService.getExpenses(page, limit, category);
            return successResponse(res, 200, 'Expenses retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getExpense(req, res, next) {
        try {
            const expense = await expenseService.getExpenseById(req.params.id);
            return successResponse(res, 200, 'Expense retrieved successfully', { expense });
        } catch (error) {
            next(error);
        }
    }

    async createExpense(req, res, next) {
        try {
            const expense = await expenseService.createExpense(req.body);
            return successResponse(res, 201, 'Expense created successfully', { expense });
        } catch (error) {
            next(error);
        }
    }

    async deleteExpense(req, res, next) {
        try {
            await expenseService.deleteExpense(req.params.id);
            return successResponse(res, 200, 'Expense deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExpenseController();
