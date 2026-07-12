const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error('[TransitOps Error]', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;

    return errorResponse(res, statusCode, message, errors);
};

module.exports = errorHandler;
