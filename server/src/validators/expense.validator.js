const { body } = require('express-validator');

const createExpenseValidation = [
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('description').optional().isString(),
    body('date').optional().isISO8601().withMessage('Date must be a valid ISO8601 format')
];

module.exports = { createExpenseValidation };
