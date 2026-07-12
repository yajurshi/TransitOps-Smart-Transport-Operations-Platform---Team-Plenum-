const { body } = require('express-validator');

const createTripValidation = [
    body('vehicleId').isInt().withMessage('Valid vehicle ID is required'),
    body('driverId').isInt().withMessage('Valid driver ID is required'),
    body('origin').trim().notEmpty().withMessage('Origin is required'),
    body('destination').trim().notEmpty().withMessage('Destination is required')
];

module.exports = { createTripValidation };
