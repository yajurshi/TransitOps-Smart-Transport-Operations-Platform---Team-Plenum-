const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({ field: err.path, message: err.msg }));
        return errorResponse(res, 400, 'Validation Failed', formattedErrors);
    }
    next();
};

module.exports = validateRequest;
