const User=require("../Models/user.model")
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
require("dotenv").config()
const Logout=require("../blacklist")

const registration=async(req,res)=>{
    const data=req.body
    try {
        if (!data || !data.email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const isuserExist=await User.findOne({email:data.email})
        
    if(isuserExist){
        return res.status(409).json({
            message:"user already exits ! please login"
        })
    }
    
    bcrypt.hash(data.password, 5, async function(err, hash) {
      if(err){
        return res.status(500).json({
            message:err.message
        })
      }

if(hash){
 const addData=new User({...data,password:hash})
 await addData.save()
res.status(201).json({
    message:"registration successfull"
})
}else{
    return res.status(500).json({
        message:"something error while generating user data ! please try again leter"
    })
}
    });
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

const Login=async(req,res)=>{
const {email,password}=req.body

try {
    const checkuerExist=await User.findOne({email})
    if(!checkuerExist){
        return res.status(404).json({
    message:"invalid credentials try again or register "
        })
    }
    
    bcrypt.compare(password,checkuerExist.password , function(err, ress) {
       if(err){
        return res.status(500).json({
            message:err.message
        })
       }
       if(ress){
        const token = jwt.sign({userId:checkuerExist._id}, `${process.env.SECRET_KEY}`,{expiresIn:"7d"});
        res.setHeader('authorization', `Bearer ${token}`);
        res.status(200).json({
            message:"user logged in successfully",
            "token":token
        })
       }else{
        res.status(500).json({
            message:"invalid credentials !, please login again or register"
        })
       }
    });
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

const updateProfile=async(req,res)=>{
    const {id}=req.params
    data=req.body
    try {
        const checkUserExist=await User.findById(id)
        if(!checkUserExist){
            res.status(404).json({
                message:"data not found"
            })
        }
        const updateProfile=await User.findByIdAndUpdate(id,data)
        res.status(201).json({
            message:"data updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

const logout=async(req,res)=>{
    try {
        const token=req.headers["Authorization"]?.split(" ")[1]
        Logout.push(token)
        res.status(200).json({
            message:"Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getOwnData=async(req,res)=>{
    const {id}=req.params
    try {
        const getdata=await User.findById(id)
        res.status(200).json({
            message:getdata
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports={registration,Login,updateProfile,logout,getOwnData}