const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
}, { versionKey: false });

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
