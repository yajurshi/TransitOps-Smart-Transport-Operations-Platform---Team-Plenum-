const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicle.controller');
const { createVehicleValidation, updateVehicleValidation } = require('../validators/vehicle.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

// All vehicle routes require authentication
router.use(requireAuth);

router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getVehicle);

// Only specific roles can modify vehicles
router.use(requireRole(['Administrator', 'Fleet Manager']));
router.post('/', createVehicleValidation, validateRequest, vehicleController.createVehicle);
router.put('/:id', updateVehicleValidation, validateRequest, vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
