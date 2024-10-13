const productSchema=require("../Models/product.model")

const addData=async(req,res)=>{
    const data=req.body
    try {
        const checkdata=await productSchema.findOne({name:data.name})
        if(checkdata){
            return res.status(409).json({
                message:"data already present "
            })
        }

const add=new productSchema({...data,createdBy:req.user._id})
await add.save()
res.status(201).json({
    message:"data successfully saved",
    add
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
        const checkdata=await productSchema.findById(id)
        if(!checkdata){
            return res.status(409).json({
                message:"data not present "
            })
        }
await productSchema.findByIdAndUpdate({_id:id},data)
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
        const checkdata=await productSchema.findById(id)
        if(!checkdata){
            return res.status(409).json({
                message:"data not present "
            })
        }
await productSchema.findByIdAndDelete({_id:id},data)
res.status(201).json({
    message:"data successfully deleted"
})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getAlldata=async(req,res)=>{
    try {
        const getallData=await productSchema.aggregate([
            {
                $lookup:"categories",
                localField:"categoryId",
                foreignField:"_id",
                as:"categories"
            },{
                $unwind:"$categories"
            }
        ])
        await res.status(200).json({
            data:getallData
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={addData,updateData,deleteData}