const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  type:{type:String,unique:true},
  shape:{type:String,unique:true},
  gender:{type:String,enum:["men","women","kids"]},

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
