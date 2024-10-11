const Category=require("../Models/categorySchema.model")

const addData=async(req,res)=>{
    const data=req.body
    try {
        const checkdata=await Category.findOne({name:data.name})
        if(checkdata){
            return res.status(409).json({
                message:"data already present "
            })
        }

const addcategory=new Category(data)
await addcategory.save()
res.status(201).json({
    message:"data successfully saved",
    addcategory
})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
const updateData=async(req,res)=>{
    const data=req.body
    const {id}=req.params
    try {
        const checkdata=await Category.findById(id)
        if(!checkdata){
            return res.status(409).json({
                message:"data not present "
            })
        }
await Category.findByIdAndUpdate({_id:id},data)
res.status(201).json({
    message:"data successfully updated"
})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteData=async(req,res)=>{
    const data=req.body
    const {id}=req.params
    try {
        const checkdata=await Category.findById(id)
        if(!checkdata){
            return res.status(409).json({
                message:"data not present "
            })
        }
await Category.findByIdAndDelete({_id:id},data)
res.status(201).json({
    message:"data successfully deleted"
})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports={addData,updateData,deleteData}