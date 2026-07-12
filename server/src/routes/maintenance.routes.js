const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance.controller');
const { createMaintenanceValidation } = require('../validators/maintenance.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.use(requireAuth);

router.get('/', maintenanceController.getLogs);
router.get('/:id', maintenanceController.getLog);

// Only Administrators and Maintenance Managers can handle requests
router.use(requireRole(['Administrator', 'Maintenance Manager']));
router.post('/', createMaintenanceValidation, validateRequest, maintenanceController.createRequest);
router.patch('/:id/approve', maintenanceController.approveRequest);
router.patch('/:id/reject', maintenanceController.rejectRequest);
router.patch('/:id/complete', maintenanceController.completeRequest);

module.exports = router;
