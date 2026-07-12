const { body } = require('express-validator');

const createVehicleValidation = [
    body('registration').trim().notEmpty().withMessage('Vehicle registration is required'),
    body('type').trim().notEmpty().withMessage('Vehicle type is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('status').optional().isIn(['available', 'maintenance', 'on_trip', 'retired']).withMessage('Invalid status')
];

const updateVehicleValidation = [
    body('type').optional().trim().notEmpty(),
    body('capacity').optional().isInt({ min: 1 }),
    body('status').optional().isIn(['available', 'maintenance', 'on_trip', 'retired'])
];

module.exports = { createVehicleValidation, updateVehicleValidation };
