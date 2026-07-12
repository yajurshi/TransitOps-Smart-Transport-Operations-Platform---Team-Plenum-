const { body } = require('express-validator');

const createDriverValidation = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('licenseNumber').trim().notEmpty().withMessage('License number is required'),
    body('licenseExpiry').optional().trim(),
    body('licenseCategory').optional().trim(),
    body('status').optional().isIn(['active', 'suspended', 'inactive']).withMessage('Invalid status'),
    body('availability').optional().isIn(['available', 'on_trip', 'off_duty']).withMessage('Invalid availability')
];

const updateDriverValidation = [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('licenseExpiry').optional().trim(),
    body('licenseCategory').optional().trim(),
    body('status').optional().isIn(['active', 'suspended', 'inactive']),
    body('availability').optional().isIn(['available', 'on_trip', 'off_duty'])
];

module.exports = { createDriverValidation, updateDriverValidation };
