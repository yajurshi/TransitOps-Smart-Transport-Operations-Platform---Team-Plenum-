const notificationRepo = require('../repositories/notification.repository');

class NotificationService {
    async getNotifications(userId) {
        return await notificationRepo.getNotificationsByUserId(userId);
    }

    async getUnreadCount(userId) {
        return await notificationRepo.getUnreadCountByUserId(userId);
    }

    async createNotification(userId, message) {
        return await notificationRepo.createNotification(userId, message);
    }

    async markAsRead(id, userId) {
        await notificationRepo.markAsRead(id, userId);
    }

    async markAllAsRead(userId) {
        await notificationRepo.markAllAsRead(userId);
    }
}

module.exports = new NotificationService();
