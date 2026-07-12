const tripService = require('../services/trip.service');
const { successResponse } = require('../utils/response');

class TripController {
    async getTrips(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status || '';

            const result = await tripService.getTrips(page, limit, status);
            return successResponse(res, 200, 'Trips retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getTrip(req, res, next) {
        try {
            const trip = await tripService.getTripById(req.params.id);
            return successResponse(res, 200, 'Trip retrieved successfully', { trip });
        } catch (error) {
            next(error);
        }
    }

    async createTrip(req, res, next) {
        try {
            const trip = await tripService.createTrip(req.body);
            return successResponse(res, 201, 'Trip created successfully', { trip });
        } catch (error) {
            next(error);
        }
    }

    async completeTrip(req, res, next) {
        try {
            const trip = await tripService.completeTrip(req.params.id);
            return successResponse(res, 200, 'Trip marked as completed', { trip });
        } catch (error) {
            next(error);
        }
    }

    async dispatchTrip(req, res, next) {
        try {
            const trip = await tripService.dispatchTrip(req.params.id);
            return successResponse(res, 200, 'Trip dispatched successfully', { trip });
        } catch (error) {
            next(error);
        }
    }

    async cancelTrip(req, res, next) {
        try {
            const trip = await tripService.cancelTrip(req.params.id);
            return successResponse(res, 200, 'Trip cancelled successfully', { trip });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TripController();
