const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');
const { requireRole } = require('./role.middleware');

const requireAuth = (req, res, next) => {
    try {
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

module.exports = { requireAuth, requireRole };
