const  Cart  = require("../Models/cart.model");
const Product=require("../Models/product.model")

const AddProductToCart=async (req, res) => {
const {id}=req.params
const userId=req.user._id
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

let checkcart = await Cart.findOne({ userId });

if (!checkcart) {
  checkcart = new Cart({
    userId,
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
}

checkCartproduct= checkcart.items.find(ele=>ele.id.toString()===id.toString())

if(checkCartproduct){
  checkCartproduct.quantity+=1
}else{
  checkcart.items.push({ 
    productId: product._id,
    productName: product.name,
    price: product.price,
    quantity: 1,
    image: product.image
  })
}

checkcart.totalItems=checkcart.items.reduce((total,ele)=>total+ele.quantity,0)
checkcart.totalPrice=checkcart.items.reduce((total,ele)=>total+ele.price,0)
res.status(201).json({
  message:"data added to cart successfully",
  checkcart
})
await checkcart.save()
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Something went wrong" });
    }
}


const removeProductfromCart = async (req, res) => {
  const { productId } = req.params;  // Get productId from URL params
  const userId = req.user._id;  // Assuming user is authenticated

  try {
    // Find the cart for the current user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the product exists in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the product from the cart
    cart.items.splice(productIndex, 1);

    // Recalculate totalItems and totalPrice after removal
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports={AddProductToCart,removeProductfromCart}