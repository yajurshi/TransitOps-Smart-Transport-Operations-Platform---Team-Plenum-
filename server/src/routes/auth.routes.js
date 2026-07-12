const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validators/auth.validator');
const validateRequest = require('../middleware/validation.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/logout', requireAuth, authController.logout);
router.get('/profile', requireAuth, authController.profile);

module.exports = router;
