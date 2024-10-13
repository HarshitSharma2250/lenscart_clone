const express = require("express");
const {addData,updateData,deleteData,getAlldata}= require("../controllers/product.controllers");
const {verifyToken,Authorization}=require("../middlwares/authenticate.middleware")
const productRouter = express.Router();

productRouter.post("/admin/product/add",verifyToken,Authorization(["admin"]),addData)
productRouter.patch("/admin/product/update/:id",verifyToken,Authorization(["admin"]),updateData)
productRouter.delete("/admin/product/delete/:id",verifyToken,Authorization(["admin"]),deleteData)
productRouter.get("/product-get",getAlldata)

module.exports=productRouter