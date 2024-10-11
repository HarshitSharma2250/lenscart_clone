const {addData,updateData,deleteData}=require("../controllers/category.controllers")
const {verifyToken,Authorization}=require("../middlwares/authenticate.middleware")
const {Router}=require("express")
const categoryRouter=Router()

categoryRouter.post("/admin/category/add",verifyToken,Authorization(["admin"]),addData)
categoryRouter.patch("/admin/category/update/:id",verifyToken,Authorization(["admin"]),updateData)
categoryRouter.delete("/admin/category/delete/:id",verifyToken,Authorization(["admin"]),deleteData)

module.exports=categoryRouter