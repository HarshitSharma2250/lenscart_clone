const {Router}=require("express")
const cartRouter = Router();
const {verifyToken,Authorization,OnlyOwnDataExist}=require("../middlwares/authenticate.middleware")
const {AddProductToCart,removeProductfromCart}=require("../controllers/cart.controller")


cartRouter.post("/user/cart/add-data/:id",verifyToken,Authorization(["customer"]),OnlyOwnDataExist,AddProductToCart)
cartRouter.post("/user/cart/remove-data/:id",verifyToken,Authorization(["customer"]),OnlyOwnDataExist,removeProductfromCart)


module.exports =  cartRouter
