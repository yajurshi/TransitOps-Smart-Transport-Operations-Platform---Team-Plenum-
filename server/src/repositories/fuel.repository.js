const { run, get, all } = require('../config/database');

const getAllLogs = async (limit, offset) => {
    let query = `
        SELECT fuel_logs.*, vehicles.registration as vehicle_reg 
        FROM fuel_logs 
        JOIN vehicles ON fuel_logs.vehicle_id = vehicles.id
        ORDER BY fuel_logs.created_at DESC LIMIT ? OFFSET ?
    `;
    
    const countRow = await get('SELECT COUNT(*) as total FROM fuel_logs');
    const total = countRow.total;

    const logs = await all(query, [limit, offset]);

    return { logs, total };
};

const getLogById = async (id) => {
    return await get(`
        SELECT fuel_logs.*, vehicles.registration as vehicle_reg 
        FROM fuel_logs 
        JOIN vehicles ON fuel_logs.vehicle_id = vehicles.id
        WHERE fuel_logs.id = ?
    `, [id]);
};

const createLog = async (data) => {
    const result = await run(`
        INSERT INTO fuel_logs (vehicle_id, gallons, cost, date)
        VALUES (?, ?, ?, ?)
    `, [data.vehicle_id, data.gallons, data.cost, data.date]);
    return result.lastID;
};

module.exports = { getAllLogs, getLogById, createLog };
