const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver.controller');
const { createDriverValidation, updateDriverValidation } = require('../validators/driver.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);

router.get('/', driverController.getDrivers);
router.get('/:id', driverController.getDriver);

router.use(requireRole(['Administrator', 'Fleet Manager']));
router.post('/', createDriverValidation, validateRequest, driverController.createDriver);
router.put('/:id', updateDriverValidation, validateRequest, driverController.updateDriver);
router.delete('/:id', driverController.deleteDriver);

module.exports = router;
