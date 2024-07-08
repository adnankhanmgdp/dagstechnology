const Notification = require('../../models/user/notifications.model')

exports.fetchNotifications = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        const notifications = await Notification.find({
            phone: phone,
            notificationFor: "user"
        });

        res.status(200).json({
            message:"Notifications fetched successfully",
            notifications
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};