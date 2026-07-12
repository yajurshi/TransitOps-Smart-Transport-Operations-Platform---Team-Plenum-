const settingsRepo = require('../repositories/settings.repository');
const { hashPassword } = require('../utils/hash');

class SettingsService {
    async getUserSettings(userId) {
        const theme = await settingsRepo.getSetting(`user:${userId}:theme`) || 'light';
        const preferences = await settingsRepo.getSetting(`user:${userId}:notification_preferences`) || { email: true, push: true };
        return { theme, preferences };
    }

    async updateProfile(userId, profileData) {
        await settingsRepo.updateUserProfile(userId, profileData);
        return { success: true };
    }

    async updatePassword(userId, newPassword) {
        const hashedPassword = await hashPassword(newPassword);
        await settingsRepo.updateUserPassword(userId, hashedPassword);
        return { success: true };
    }

    async updateTheme(userId, theme) {
        await settingsRepo.setSetting(`user:${userId}:theme`, theme);
        return { theme };
    }

    async updateNotificationPreferences(userId, preferences) {
        await settingsRepo.setSetting(`user:${userId}:notification_preferences`, preferences);
        return { preferences };
    }
}

module.exports = new SettingsService();
