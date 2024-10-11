const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      image: { type: String }
    },
  ],

  totalItems: {
    type: Number,
    default: 0,
  },

  totalPrice: {
    type: Number,
    default: 0,
  },

  discounts: {
    code: { type: String },
    discountAmount: { type: Number, default: 0 },
  },

  status: {
    type: String,
    default: 'active',
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  }
},{
  versioonKey:false,
  timestamps:true,
  strict:true
});

module.exports = mongoose.model('Cart', cartSchema);
