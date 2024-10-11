const jwt = require("jsonwebtoken");
const User=require('../Models/user.model')
const Cart=require("../Models/cart.model")
require("dotenv").config()

const verifyToken = async (req, res, next) => {


  const token = req.headers["authorization"]?.split(' ')[1];

  try {
    const decoded =await jwt.verify(token,`${process.env.SECRET_KEY}`);
    req.user = await User.findById({_id:decoded.userId})

    if (!req.user) {
      return res.status(404).json({ message: 'Account not matched' });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message:err.message,
            "error":"error coming from here"
    })
}
}


const Authorization = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!userRole) {
        return res.status(404).json({
          message: "User role not found",
        });
      }
      console.log(userRole)
      console.log(allowedRoles,"    allowedRoles")
      allowedRoles=allowedRoles.toString()
      if (!allowedRoles.includes(userRole.toString())) {
        return res.status(403).json({
          message: "You are not authorized to access this resource",
        });
      }
      next(); 
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
};

const OnlyOwnProfile = async (req, res, next) => {
  const { id } = req.params; // Assuming the user ID is passed in params
  
  try {
    const user = await User.findById(id);  // Find the user profile being accessed

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Allow if the user is admin or accessing their own profile
    if (req.user.role === 'admin' || req.user._id.toString() === id) {
      next();  // Proceed if the user is admin or owns the profile
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const OnlyOwnDataExist = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const cart = await Cart.findById(id).populate("userId");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // Allow access if the user is admin or if they own the cart
    if (req.user.role === 'admin' || req.user._id.toString() === cart.userId._id.toString()) {
      next();  // Proceed if the user is admin or owns the cart
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {verifyToken,Authorization,OnlyOwnProfile,OnlyOwnDataExist}
