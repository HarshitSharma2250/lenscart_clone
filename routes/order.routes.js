const {Router}=require("express")
const orderRouter = Router();
const {verifyToken,Authorization,OnlyOwnDataExist}=require("../middlwares/authenticate.middleware")
const {placeOrder}=require("../controllers/order.controller")


orderRouter.post("/user/cart/add-data",verifyToken,Authorization(["customer"]),OnlyOwnDataExist,placeOrder)


module.exports =  orderRouter
