const authService = require('../services/auth.service');
const { successResponse } = require('../utils/response');

class AuthController {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);
            return successResponse(res, 201, 'User registered successfully', { user });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);

            // Set HTTP-only cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            return successResponse(res, 200, 'Login successful', { user, token });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('jwt');
            return successResponse(res, 200, 'Logged out successfully');
        } catch (error) {
            next(error);
        }
    }

    async profile(req, res, next) {
        try {
            // req.user is set by the auth middleware
            const user = await authService.getProfile(req.user.id);
            return successResponse(res, 200, 'Profile fetched successfully', { user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
