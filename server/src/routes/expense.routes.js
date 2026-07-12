const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense.controller');
const { createExpenseValidation } = require('../validators/expense.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);

// All roles can view expenses
router.get('/', expenseController.getExpenses);
router.get('/:id', expenseController.getExpense);

// Only Financial Analysts and Administrators can modify expenses
router.use(requireRole(['Administrator', 'Financial Analyst']));
router.post('/', createExpenseValidation, validateRequest, expenseController.createExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
