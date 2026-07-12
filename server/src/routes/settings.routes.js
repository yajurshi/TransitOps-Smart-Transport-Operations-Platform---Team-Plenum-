const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settings.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.use(requireAuth);

router.get('/', settingsController.getSettings);
router.put('/profile', settingsController.updateProfile);
router.put('/password', settingsController.updatePassword);
router.put('/theme', settingsController.updateTheme);
router.put('/preferences', settingsController.updateNotificationPreferences);

module.exports = router;
