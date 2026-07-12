const express = require('express');
const router = express.Router();

const fuelController = require('../controllers/fuel.controller');
const { createFuelValidation } = require('../validators/fuel.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);

// All roles can view fuel logs
router.get('/', fuelController.getLogs);
router.get('/:id', fuelController.getLog);

// Only Administrators, Fleet Managers, and Financial Analysts can add fuel logs
router.use(requireRole(['Administrator', 'Fleet Manager', 'Financial Analyst']));
router.post('/', createFuelValidation, validateRequest, fuelController.createLog);

module.exports = router;
