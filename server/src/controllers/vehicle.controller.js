const vehicleService = require('../services/vehicle.service');
const { successResponse } = require('../utils/response');

class VehicleController {
    async getVehicles(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const status = req.query.status || '';

            const result = await vehicleService.getVehicles(page, limit, search, status);
            return successResponse(res, 200, 'Vehicles retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getVehicle(req, res, next) {
        try {
            const vehicle = await vehicleService.getVehicleById(req.params.id);
            return successResponse(res, 200, 'Vehicle retrieved successfully', { vehicle });
        } catch (error) {
            next(error);
        }
    }

    async createVehicle(req, res, next) {
        try {
            const vehicle = await vehicleService.createVehicle(req.body);
            return successResponse(res, 201, 'Vehicle created successfully', { vehicle });
        } catch (error) {
            next(error);
        }
    }

    async updateVehicle(req, res, next) {
        try {
            const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
            return successResponse(res, 200, 'Vehicle updated successfully', { vehicle });
        } catch (error) {
            next(error);
        }
    }

    async deleteVehicle(req, res, next) {
        try {
            await vehicleService.deleteVehicle(req.params.id);
            return successResponse(res, 200, 'Vehicle deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new VehicleController();
