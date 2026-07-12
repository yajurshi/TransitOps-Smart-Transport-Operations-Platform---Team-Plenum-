const { run, get, all } = require('../config/database');

const getAllDrivers = async (limit, offset, search, status, availability) => {
    let query = 'SELECT * FROM drivers WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND (first_name LIKE ? OR last_name LIKE ? OR license_number LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    
    if (availability) {
        query += ' AND availability = ?';
        params.push(availability);
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const countRow = await get(countQuery, params);
    const total = countRow.total;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const drivers = await all(query, params);

    return { drivers, total };
};

const getDriverById = async (id) => {
    return await get('SELECT * FROM drivers WHERE id = ?', [id]);
};

const createDriver = async (data) => {
    const result = await run(`
        INSERT INTO drivers (first_name, last_name, license_number, license_expiry, license_category, status, availability)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [data.first_name, data.last_name, data.license_number, data.license_expiry, data.license_category, data.status, data.availability]);
    return result.lastID;
};

const updateDriver = async (id, data) => {
    await run(`
        UPDATE drivers 
        SET first_name = ?, last_name = ?, license_number = ?, license_expiry = ?, license_category = ?, status = ?, availability = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [data.first_name, data.last_name, data.license_number, data.license_expiry, data.license_category, data.status, data.availability, id]);
};

const deleteDriver = async (id) => {
    await run('DELETE FROM drivers WHERE id = ?', [id]);
};

module.exports = { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
