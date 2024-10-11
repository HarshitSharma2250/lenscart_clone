const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
name:{
  type:String,
  required:true,
  minlength:[2,"length should be more then two or two character"]
},
email:{
  type:String,
  required:true,
  unique:true,
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password:{
  required:true,
  min:[6,"password length should be 6 or more then 6 "],
  type:String
},

  number:{
    type:String,
    required:true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits and contain only numbers'],
  },
  age:{
    type:Number,
    required:true
  },
  gender:{
    type:String,
    enum:["male","female","other"],
    required:true
  },
  role:{
    type:String,
    enum:["customer","admin"],
    default:"customer"
  }
},{
  versionKey:false,
  timestamps:true,
  strict:true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel
