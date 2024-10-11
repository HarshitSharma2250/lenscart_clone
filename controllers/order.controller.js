const Order = require("../Models/order.model");
const Cart = require("../Models/cart.model");


const placeOrder = async (req, res) => {
  const userId = req.user._id; 
  const { shippingAddress } = req.body; // Shipping address from request body

  try {



    // Find the user's cart
    const checkuser = await Cart.findOne({ userId }) // Populate product details


if(!checkuser){
    return res.status(500).json({
        message:"user not exist"
    })
}

const checkitemincart=await checkuser.populate("items.productId").execPopulate();

    if (!checkitemincart || checkitemincart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Prepare order items from cart items
    const orderItems = checkitemincart.items.map(item => ({
      product: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));

    // Calculate total amount
    const totalAmount = checkitemincart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      orderStatus: "pending", // Default status is pending
    });

    // Save the order
    await newOrder.save();

    // Clear the cart after placing the order
    checkitemincart.items = [];
    checkitemincart.totalItems = 0;
    checkitemincart.totalPrice = 0;
    await checkitemincart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { placeOrder };
