const { body } = require('express-validator');

const createFuelValidation = [
    body('vehicleId').isInt().withMessage('Valid vehicle ID is required'),
    body('gallons').isFloat({ min: 0.1 }).withMessage('Gallons must be greater than 0'),
    body('cost').isFloat({ min: 0 }).withMessage('Cost must be a positive number'),
    body('date').optional().isISO8601().withMessage('Date must be a valid ISO8601 format')
];

module.exports = { createFuelValidation };
