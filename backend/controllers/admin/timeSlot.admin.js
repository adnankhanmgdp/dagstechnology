const TimeSlot = require("../../models/admin/timeSlots.model");

exports.createTimeSlot = async (req, res) => {
    try {
        const { startTime, endTime } = req.body;

        // Validate time format (HH:mm)
        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeFormat.test(startTime) || !timeFormat.test(endTime)) {
            return res.status(400).json({
                message: "Invalid time format. Please use HH:mm format."
            });
        }

        // Create a new TimeSlot document
        const timeSlot = new TimeSlot({ startTime, endTime });
        await timeSlot.save();

        return res.json({ timeSlot });
    } catch (error) {
        res.status(500).json({
            message: "Error creating time slot.",
            error: error.message
        });
    }
};

exports.getTimeSlots = async (req, res) => {
    try {
        // Fetch and sort time slots by startTime in ascending order
        const timeSlots = await TimeSlot.find().sort({ startTime: 1 });

        return res.json({ timeSlots });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching time slots.",
            error: error.message
        });
    }
};

exports.deleteTimeSlot = async (req, res) => {
    try {
        const { id } = req.body;
        const time = await TimeSlot.findByIdAndDelete(id)
        res.json({
            time
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting time slots.",
            error: error.message
        });
    }
}
