const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
    lensType: {
      type: String,
      enum: ['Single Vision', 'Progressive', 'Bifocal', 'Plano'], // Lens types specific to eyewear
    },
    frameMaterial: {
      type: String,
    },
    color: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex',"child"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Reference to User (admin who creates the product)
      required: true,
    },
    discount: {
      type: Number, // In percentage
      default: 0,
    },
    categoryId:[{
      type:Schema.Types.ObjectId,
      ref:"Category"
    }]
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
