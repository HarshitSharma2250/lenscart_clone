const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingFeedbackSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',  // Reference to the Product being rated
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User providing the rating/feedback
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,  // Rating system on a scale of 1-5
    },
    feedback: {
      type: String,  // Optional textual feedback
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Automatically sets the feedback date
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    versionKey: false,
    strict: true,
  }
);

module.exports = mongoose.model('RatingFeedback', ratingFeedbackSchema);
