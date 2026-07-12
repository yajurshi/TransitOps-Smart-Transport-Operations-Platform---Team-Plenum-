const { run, get, all } = require('../config/database');

const getAllLogs = async (limit, offset, status) => {
    let query = `
        SELECT maintenance_logs.*, vehicles.registration as vehicle_reg 
        FROM maintenance_logs 
        JOIN vehicles ON maintenance_logs.vehicle_id = vehicles.id
        WHERE 1=1
    `;
    const params = [];

    if (status) {
        query += ' AND maintenance_logs.status = ?';
        params.push(status);
    }

    const countQuery = 'SELECT COUNT(*) as total FROM maintenance_logs' + (status ? ' WHERE status = ?' : '');
    const countParams = status ? [status] : [];
    const countRow = await get(countQuery, countParams);
    const total = countRow.total;

    query += ' ORDER BY maintenance_logs.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const logs = await all(query, params);

    return { logs, total };
};

const getLogById = async (id) => {
    return await get(`
        SELECT maintenance_logs.*, vehicles.registration as vehicle_reg 
        FROM maintenance_logs 
        JOIN vehicles ON maintenance_logs.vehicle_id = vehicles.id
        WHERE maintenance_logs.id = ?
    `, [id]);
};

const createLog = async (data) => {
    const result = await run(`
        INSERT INTO maintenance_logs (vehicle_id, description, cost, status)
        VALUES (?, ?, ?, 'pending')
    `, [data.vehicle_id, data.description, data.cost]);
    return result.lastID;
};

const updateLogStatus = async (id, status) => {
    await run(`
        UPDATE maintenance_logs 
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [status, id]);
};

module.exports = { getAllLogs, getLogById, createLog, updateLogStatus };
