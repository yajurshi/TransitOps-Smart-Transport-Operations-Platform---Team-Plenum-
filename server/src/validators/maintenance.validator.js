const { body } = require('express-validator');

const createMaintenanceValidation = [
    body('vehicleId').isInt().withMessage('Valid vehicle ID is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('cost').optional().isFloat({ min: 0 }).withMessage('Cost must be a positive number')
];

module.exports = { createMaintenanceValidation };
