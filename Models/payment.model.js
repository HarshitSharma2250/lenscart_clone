const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Parent reference (Order)
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
    required: true
  },
  transactionId: { type: String, required: true }, // Transaction ID from payment gateway
  amountPaid: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: { type: Date, default: Date.now },
  failureReason: { type: String }, // Optional field to store failure reasons
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
