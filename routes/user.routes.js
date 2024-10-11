const {Router}=require("express")
const {verifyToken,Authorization,OnlyOwnProfile}=require("../middlwares/authenticate.middleware")
const userRouter=Router()
const {registration,Login,updateProfile,logout,getOwnData}=require("../controllers/user.controllers")

userRouter.post("/user/register",registration)
userRouter.post("/user/login",Login)
userRouter.post("/user/update/:id",verifyToken,Authorization(["customer"]),OnlyOwnProfile,updateProfile)
userRouter.post("/user/logout/:id",verifyToken,Authorization(["customer","admin"]),OnlyOwnProfile,logout)
userRouter.get("/user/getSingleDataUser/:id",verifyToken,Authorization(["customer","admin"]),OnlyOwnProfile,getOwnData)

module.exports=userRouter
