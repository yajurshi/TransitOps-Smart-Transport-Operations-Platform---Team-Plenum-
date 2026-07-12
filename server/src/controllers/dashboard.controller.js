const dashboardService = require('../services/dashboard.service');
const { successResponse } = require('../utils/response');

class DashboardController {
    async getMetrics(req, res, next) {
        try {
            const metrics = await dashboardService.getDashboardMetrics();
            return successResponse(res, 200, 'Dashboard metrics retrieved successfully', metrics);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DashboardController();
