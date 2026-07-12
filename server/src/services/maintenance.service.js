const maintenanceRepo = require('../repositories/maintenance.repository');
const vehicleRepo = require('../repositories/vehicle.repository');

class MaintenanceService {
    async getLogs(page = 1, limit = 10, status = '') {
        const offset = (page - 1) * limit;
        return await maintenanceRepo.getAllLogs(limit, offset, status);
    }

    async getLogById(id) {
        const log = await maintenanceRepo.getLogById(id);
        if (!log) {
            const error = new Error('Maintenance log not found');
            error.statusCode = 404;
            throw error;
        }
        return log;
    }

    async createRequest(data) {
        const vehicle = await vehicleRepo.getVehicleById(data.vehicleId);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }

        const logId = await maintenanceRepo.createLog({
            vehicle_id: data.vehicleId,
            description: data.description,
            cost: data.cost || 0.0
        });

        await vehicleRepo.updateVehicle(data.vehicleId, {
            type: vehicle.type,
            capacity: vehicle.capacity,
            status: 'maintenance'
        });

        return await this.getLogById(logId);
    }

    async updateStatus(id, status) {
        const log = await this.getLogById(id);
        await maintenanceRepo.updateLogStatus(id, status);

        if (status === 'completed' || status === 'rejected') {
            const vehicle = await vehicleRepo.getVehicleById(log.vehicle_id);
            await vehicleRepo.updateVehicle(log.vehicle_id, {
                type: vehicle.type,
                capacity: vehicle.capacity,
                status: 'available'
            });
        }

        return await this.getLogById(id);
    }
}

module.exports = new MaintenanceService();
