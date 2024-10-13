const productSchema=require("../Models/product.model")
const mongoose=require("mongoose")

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
                $lookup:{
                    from:"categories",
                localField:"categoryId",
                foreignField:"_id",
                as:"categories"
                }
            },{
                $unwind:"$categories"
            },
            {
                $group: {
                    _id: "$_id",  // Group by product ID
                    name: { $first: "$name" },
                    description: { $first: "$description" },
                    price: { $first: "$price" },
                    brand: { $first: "$brand" },
                    image: { $first: "$image" },
                    stock: { $first: "$stock" },
                    lensType: { $first: "$lensType" },
                    frameMaterial: { $first: "$frameMaterial" },
                    color: { $first: "$color" },
                    gender: { $first: "$gender" },
                    createdBy: { $first: "$createdBy" },
                    discount: { $first: "$discount" },
                    categories: { $push: "$categories" } // Push all categories into an array
                }
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

const single_product = async (req, res) => {
    const { id } = req.params; 
    try {
      // Find product by ID to ensure it exists
      const checkproduct = await productSchema.findById(id);
      if (!checkproduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      // Use aggregation to fetch product details and join categories
      const getdata = await productSchema.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },  
        },
        {
          $lookup: {
            from: "categories",  // Name of the Category collection
            localField: "categoryId",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $unwind: "$categories",  // Unwind the category array (if necessary)
        },
        {
          $project: {  // Select fields to return in the response
            _id: 1,
            name: 1,
            description: 1,
            price: 1,
            brand: 1,
            image: 1,
            stock: 1,
            lensType: 1,
            frameMaterial: 1,
            color: 1,
            gender: 1,
            createdBy: 1,
            discount: 1,
            category: "$categories",  // Return the category object
          }
        }
      ]);
  
      // Check if product data was found after aggregation
      if (getdata.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      res.status(200).json({
        data: getdata[0],  // Return the first result (since it's a single product)
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

module.exports={addData,updateData,deleteData,getAlldata,single_product}