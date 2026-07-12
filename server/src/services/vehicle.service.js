const vehicleRepo = require('../repositories/vehicle.repository');

class VehicleService {
    async getVehicles(page = 1, limit = 10, search = '', status = '') {
        const offset = (page - 1) * limit;
        return await vehicleRepo.getAllVehicles(limit, offset, search, status);
    }

    async getVehicleById(id) {
        const vehicle = await vehicleRepo.getVehicleById(id);
        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.statusCode = 404;
            throw error;
        }
        return vehicle;
    }

    async createVehicle(data) {
        try {
            const vehicleId = await vehicleRepo.createVehicle({
                registration: data.registration,
                type: data.type,
                capacity: data.capacity,
                status: data.status || 'available'
            });
            return await this.getVehicleById(vehicleId);
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                const err = new Error('Vehicle with this registration already exists');
                err.statusCode = 400;
                throw err;
            }
            throw error;
        }
    }

    async updateVehicle(id, data) {
        await this.getVehicleById(id); // verify exists
        await vehicleRepo.updateVehicle(id, data);
        return await this.getVehicleById(id);
    }

    async deleteVehicle(id) {
        await this.getVehicleById(id); // verify exists
        await vehicleRepo.deleteVehicle(id);
    }
}

module.exports = new VehicleService();
