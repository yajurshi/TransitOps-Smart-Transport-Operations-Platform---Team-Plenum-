const fuelService = require('../services/fuel.service');
const { successResponse } = require('../utils/response');

class FuelController {
    async getLogs(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await fuelService.getLogs(page, limit);
            return successResponse(res, 200, 'Fuel logs retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getLog(req, res, next) {
        try {
            const log = await fuelService.getLogById(req.params.id);
            return successResponse(res, 200, 'Fuel log retrieved successfully', { log });
        } catch (error) {
            next(error);
        }
    }

    async createLog(req, res, next) {
        try {
            const log = await fuelService.createLog(req.body);
            return successResponse(res, 201, 'Fuel log created successfully', { log });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FuelController();
