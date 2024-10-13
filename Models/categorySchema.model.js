const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  type: { type: [String] }, // Type as an array of strings
  shape: { type: [String] }, // Shape as an array of strings
  gender:{type:String,enum:["men","women","kids"]},

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
