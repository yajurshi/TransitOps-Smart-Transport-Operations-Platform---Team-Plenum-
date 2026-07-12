const { run, get } = require('../config/database');

const findUserByEmail = async (email) => {
    return await get('SELECT users.*, roles.name as role_name FROM users JOIN roles ON users.role_id = roles.id WHERE email = ?', [email]);
};

const findRoleByName = async (roleName) => {
    return await get('SELECT * FROM roles WHERE name = ?', [roleName]);
};

const createUser = async (userData) => {
    const result = await run(`
        INSERT INTO users (first_name, last_name, email, password_hash, phone, role_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password_hash,
        userData.phone,
        userData.role_id
    ]);
    return result.lastID;
};

const findUserById = async (id) => {
    return await get('SELECT users.id, users.first_name, users.last_name, users.email, users.phone, users.status, roles.name as role_name FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = ?', [id]);
};

module.exports = { findUserByEmail, findRoleByName, createUser, findUserById };
