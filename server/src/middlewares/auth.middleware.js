const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const requireAuth = (req, res, next) => {
    try {
        // Extract token from header or cookie
        let token = req.cookies?.jwt;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return errorResponse(res, 401, 'Authentication required');
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return errorResponse(res, 401, 'Invalid or expired token');
        }

        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse(res, 401, 'Authentication failed');
    }
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 403, 'You do not have permission to perform this action');
        }
        next();
    };
};

module.exports = { requireAuth, requireRole };
