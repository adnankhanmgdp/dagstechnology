const Payment = require('../../../backend/models/user/payment.model')

exports.getPayments = async (req, res) => {
 try {
  const payment = await Payment.find();
   res.status(200).json({ payment });
 } catch (error) {
  res.status(500).json({message:"Error fetching payments"});
 }
}