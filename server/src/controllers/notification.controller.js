const notificationService = require('../services/notification.service');
const { successResponse } = require('../utils/response');

class NotificationController {
    async getNotifications(req, res, next) {
        try {
            const notifications = await notificationService.getNotifications(req.user.id);
            return successResponse(res, 200, 'Notifications retrieved successfully', { notifications });
        } catch (error) {
            next(error);
        }
    }

    async getUnreadCount(req, res, next) {
        try {
            const count = await notificationService.getUnreadCount(req.user.id);
            return successResponse(res, 200, 'Unread count retrieved successfully', { count });
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req, res, next) {
        try {
            await notificationService.markAsRead(req.params.id, req.user.id);
            return successResponse(res, 200, 'Notification marked as read');
        } catch (error) {
            next(error);
        }
    }

    async markAllAsRead(req, res, next) {
        try {
            await notificationService.markAllAsRead(req.user.id);
            return successResponse(res, 200, 'All notifications marked as read');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NotificationController();
