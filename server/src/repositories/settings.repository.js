const { run, get } = require('../config/database');

const getSetting = async (key) => {
    const row = await get('SELECT value FROM settings WHERE key = ?', [key]);
    return row ? JSON.parse(row.value) : null;
};

const setSetting = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    await run(`
        INSERT INTO settings (key, value, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `, [key, jsonValue]);
};

const updateUserProfile = async (userId, data) => {
    await run(`
        UPDATE users 
        SET first_name = ?, last_name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `, [data.firstName, data.lastName, data.phone, userId]);
};

const updateUserPassword = async (userId, passwordHash) => {
    await run('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [passwordHash, userId]);
};

module.exports = { getSetting, setSetting, updateUserProfile, updateUserPassword };
