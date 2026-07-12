const express = require('express');
const router = express.Router();

const tripController = require('../controllers/trip.controller');
const { createTripValidation } = require('../validators/trip.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTrip);

// Only Administrators and Dispatchers can manage trips
router.use(requireRole(['Administrator', 'Dispatcher']));
router.post('/', createTripValidation, validateRequest, tripController.createTrip);
router.patch('/:id/dispatch', tripController.dispatchTrip);
router.patch('/:id/complete', tripController.completeTrip);
router.patch('/:id/cancel', tripController.cancelTrip);

module.exports = router;
