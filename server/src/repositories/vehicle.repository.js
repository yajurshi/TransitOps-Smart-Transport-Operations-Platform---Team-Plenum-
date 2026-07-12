const { run, get, all } = require('../config/database');

const getAllVehicles = async (limit, offset, search, status) => {
    let query = 'SELECT * FROM vehicles WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND (registration LIKE ? OR type LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const countRow = await get(countQuery, params);
    const total = countRow.total;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const vehicles = await all(query, params);

    return { vehicles, total };
};

const getVehicleById = async (id) => {
    return await get('SELECT * FROM vehicles WHERE id = ?', [id]);
};

const createVehicle = async (data) => {
    const result = await run(`
        INSERT INTO vehicles (registration, type, capacity, status)
        VALUES (?, ?, ?, ?)
    `, [data.registration, data.type, data.capacity, data.status]);
    
    return result.lastID;
};

const updateVehicle = async (id, data) => {
    await run(`
        UPDATE vehicles 
        SET type = ?, capacity = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [data.type, data.capacity, data.status, id]);
};

const deleteVehicle = async (id) => {
    await run('DELETE FROM vehicles WHERE id = ?', [id]);
};

module.exports = { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
