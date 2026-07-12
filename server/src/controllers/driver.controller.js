const driverService = require('../services/driver.service');
const { successResponse } = require('../utils/response');

class DriverController {
    async getDrivers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const status = req.query.status || '';
            const availability = req.query.availability || '';

            const result = await driverService.getDrivers(page, limit, search, status, availability);
            return successResponse(res, 200, 'Drivers retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getDriver(req, res, next) {
        try {
            const driver = await driverService.getDriverById(req.params.id);
            return successResponse(res, 200, 'Driver retrieved successfully', { driver });
        } catch (error) {
            next(error);
        }
    }

    async createDriver(req, res, next) {
        try {
            const driver = await driverService.createDriver(req.body);
            return successResponse(res, 201, 'Driver created successfully', { driver });
        } catch (error) {
            next(error);
        }
    }

    async updateDriver(req, res, next) {
        try {
            const driver = await driverService.updateDriver(req.params.id, req.body);
            return successResponse(res, 200, 'Driver updated successfully', { driver });
        } catch (error) {
            next(error);
        }
    }

    async deleteDriver(req, res, next) {
        try {
            await driverService.deleteDriver(req.params.id);
            return successResponse(res, 200, 'Driver deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DriverController();
