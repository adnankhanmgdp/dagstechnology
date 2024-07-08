const Misc = require('../../models/logistic/miscellaneous');


exports.tnc = async (req, res) => {
    try {
        const info = await Misc.findOne({})
        return res.json({
            info:info.faq
        })
    } catch (error) {
        res.status(500).json({ message: "Error creating bank details.", error: error.message });
    }
}