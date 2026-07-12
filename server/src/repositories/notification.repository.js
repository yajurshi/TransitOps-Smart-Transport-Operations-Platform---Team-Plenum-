const { run, get, all } = require('../config/database');

const getNotificationsByUserId = async (userId) => {
    return await all('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);
};

const getUnreadCountByUserId = async (userId) => {
    const row = await get('SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0', [userId]);
    return row.count;
};

const createNotification = async (userId, message) => {
    const result = await run('INSERT INTO notifications (user_id, message, is_read) VALUES (?, ?, 0)', [userId, message]);
    return result.lastID;
};

const markAsRead = async (id, userId) => {
    await run('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [id, userId]);
};

const markAllAsRead = async (userId) => {
    await run('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);
};

module.exports = { getNotificationsByUserId, getUnreadCountByUserId, createNotification, markAsRead, markAllAsRead };
