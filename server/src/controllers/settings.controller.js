const settingsService = require('../services/settings.service');
const { successResponse } = require('../utils/response');

class SettingsController {
    async getSettings(req, res, next) {
        try {
            const settings = await settingsService.getUserSettings(req.user.id);
            return successResponse(res, 200, 'Settings retrieved successfully', settings);
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const result = await settingsService.updateProfile(req.user.id, req.body);
            return successResponse(res, 200, 'Profile updated successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req, res, next) {
        try {
            const result = await settingsService.updatePassword(req.user.id, req.body.password);
            return successResponse(res, 200, 'Password updated successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async updateTheme(req, res, next) {
        try {
            const result = await settingsService.updateTheme(req.user.id, req.body.theme);
            return successResponse(res, 200, 'Theme updated successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async updateNotificationPreferences(req, res, next) {
        try {
            const result = await settingsService.updateNotificationPreferences(req.user.id, req.body.preferences);
            return successResponse(res, 200, 'Notification preferences updated successfully', result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SettingsController();
