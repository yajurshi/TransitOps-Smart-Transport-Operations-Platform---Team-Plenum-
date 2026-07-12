const authRepo = require('../repositories/auth.repository');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

class AuthService {
    async register(data) {
        const { firstName, lastName, email, phone, password, role } = data;

        // Check if email already exists
        const existingUser = await authRepo.findUserByEmail(email);
        if (existingUser) {
            const error = new Error('Email is already registered');
            error.statusCode = 400;
            throw error;
        }

        // Verify role exists
        const roleRecord = await authRepo.findRoleByName(role);
        if (!roleRecord) {
            const error = new Error('Invalid role specified');
            error.statusCode = 400;
            throw error;
        }

        // Hash password
        const password_hash = await hashPassword(password);

        // Store user
        const newUserId = await authRepo.createUser({
            firstName,
            lastName,
            email,
            password_hash,
            phone: phone || null,
            role_id: roleRecord.id
        });

        const newUser = await authRepo.findUserById(newUserId);
        return newUser;
    }

    async login(email, password) {
        const user = await authRepo.findUserByEmail(email);
        
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        if (user.status !== 'active') {
            const error = new Error('Your account is disabled');
            error.statusCode = 403;
            throw error;
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role_name
        };

        const token = generateToken(tokenPayload);

        // Exclude password hash from return data
        const { password_hash, role_id, ...userData } = user;

        return { user: userData, token };
    }
    
    async getProfile(userId) {
        const user = await authRepo.findUserById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }
}

module.exports = new AuthService();
