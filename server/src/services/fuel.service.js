const fuelRepo = require('../repositories/fuel.repository');
const vehicleRepo = require('../repositories/vehicle.repository');

class FuelService {
    async getLogs(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        return await fuelRepo.getAllLogs(limit, offset);
    }

    async getLogById(id) {
        const log = await fuelRepo.getLogById(id);
        if (!log) {
            const error = new Error('Fuel log not found');
            error.statusCode = 404;
            throw error;
        }
        return log;
    }

    async createLog(data) {
        const vehicle = await vehicleRepo.getVehicleById(data.vehicleId);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        const logId = await fuelRepo.createLog({
            vehicle_id: data.vehicleId,
            gallons: data.gallons,
            cost: data.cost,
            date: data.date || new Date().toISOString()
        });

        return await this.getLogById(logId);
    }
}

module.exports = new FuelService();
