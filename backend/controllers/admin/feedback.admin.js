const Feedback = require("../../models/user/feedback.model")

exports.vendorFeedback = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const feedbacks = await Feedback.find({ vendorId: vendorId })

        res.json({
            message: "feedback fetched successfully",
            feedbacks
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}