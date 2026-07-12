const maintenanceService = require('../services/maintenance.service');
const { successResponse } = require('../utils/response');

class MaintenanceController {
    async getLogs(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status || '';

            const result = await maintenanceService.getLogs(page, limit, status);
            return successResponse(res, 200, 'Maintenance logs retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getLog(req, res, next) {
        try {
            const log = await maintenanceService.getLogById(req.params.id);
            return successResponse(res, 200, 'Maintenance log retrieved successfully', { log });
        } catch (error) {
            next(error);
        }
    }

    async createRequest(req, res, next) {
        try {
            const log = await maintenanceService.createRequest(req.body);
            return successResponse(res, 201, 'Maintenance request created successfully', { log });
        } catch (error) {
            next(error);
        }
    }

    async approveRequest(req, res, next) {
        try {
            const log = await maintenanceService.updateStatus(req.params.id, 'approved');
            return successResponse(res, 200, 'Maintenance request approved', { log });
        } catch (error) {
            next(error);
        }
    }

    async rejectRequest(req, res, next) {
        try {
            const log = await maintenanceService.updateStatus(req.params.id, 'rejected');
            return successResponse(res, 200, 'Maintenance request rejected', { log });
        } catch (error) {
            next(error);
        }
    }

    async completeRequest(req, res, next) {
        try {
            const log = await maintenanceService.updateStatus(req.params.id, 'completed');
            return successResponse(res, 200, 'Maintenance request completed', { log });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MaintenanceController();
