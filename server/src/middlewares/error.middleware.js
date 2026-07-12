const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error('[Error Middleware]:', err.message || err);
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return errorResponse(res, status, message);
};

const notFound = (req, res, next) => {
    return errorResponse(res, 404, 'API Route Not Found');
};

module.exports = { errorHandler, notFound };
