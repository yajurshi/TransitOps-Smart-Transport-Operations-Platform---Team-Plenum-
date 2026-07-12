const { run, get, all } = require('../config/database');

const getAllTrips = async (limit, offset, status) => {
    let query = `
        SELECT trips.*, 
               vehicles.registration as vehicle_reg, 
               drivers.first_name || ' ' || drivers.last_name as driver_name 
        FROM trips 
        JOIN vehicles ON trips.vehicle_id = vehicles.id
        JOIN drivers ON trips.driver_id = drivers.id
        WHERE 1=1
    `;
    const params = [];

    if (status) {
        query += ' AND trips.status = ?';
        params.push(status);
    }

    const countQuery = 'SELECT COUNT(*) as total FROM trips' + (status ? ' WHERE status = ?' : '');
    const countParams = status ? [status] : [];
    const countRow = await get(countQuery, countParams);
    const total = countRow.total;

    query += ' ORDER BY trips.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const trips = await all(query, params);

    return { trips, total };
};

const getTripById = async (id) => {
    return await get(`
        SELECT trips.*, 
               vehicles.registration as vehicle_reg, 
               drivers.first_name || ' ' || drivers.last_name as driver_name 
        FROM trips 
        JOIN vehicles ON trips.vehicle_id = vehicles.id
        JOIN drivers ON trips.driver_id = drivers.id
        WHERE trips.id = ?
    `, [id]);
};

const createTrip = async (data) => {
    const result = await run(`
        INSERT INTO trips (vehicle_id, driver_id, origin, destination, status, start_time, end_time)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [data.vehicle_id, data.driver_id, data.origin, data.destination, data.status, data.start_time, data.end_time]);
    return result.lastID;
};

const updateTripStatus = async (id, status, endTime) => {
    await run(`
        UPDATE trips 
        SET status = ?, end_time = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [status, endTime, id]);
};

const getDriverActiveTrip = async (driverId) => {
    return await get(`
        SELECT * FROM trips 
        WHERE driver_id = ? AND status IN ('scheduled', 'draft', 'dispatched')
        LIMIT 1
    `, [driverId]);
};

const getVehicleActiveTrip = async (vehicleId) => {
    return await get(`
        SELECT * FROM trips 
        WHERE vehicle_id = ? AND status IN ('scheduled', 'draft', 'dispatched')
        LIMIT 1
    `, [vehicleId]);
};

module.exports = { 
    getAllTrips, 
    getTripById, 
    createTrip, 
    updateTripStatus,
    getDriverActiveTrip,
    getVehicleActiveTrip
};
