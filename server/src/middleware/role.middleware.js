const { errorResponse } = require('../utils/response');

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 403, 'You do not have permission to perform this action');
        }
        next();
    };
};

module.exports = { requireRole };
