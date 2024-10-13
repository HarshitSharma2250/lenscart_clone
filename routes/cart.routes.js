const {Router}=require("express")
const cartRouter = Router();
const {verifyToken,Authorization,OnlyOwnDataExist,OnlyOwnProfile}=require("../middlwares/authenticate.middleware")
const {AddProductToCart,removeProductfromCart}=require("../controllers/cart.controller")


cartRouter.post("/user/cart/add-data/:id",verifyToken,Authorization(["customer"]),OnlyOwnProfile,AddProductToCart)
cartRouter.delete("/user/cart/remove-data/:id",verifyToken,Authorization(["customer"]),OnlyOwnDataExist,removeProductfromCart)


module.exports =  cartRouter
