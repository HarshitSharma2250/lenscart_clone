const mongoose = require("mongoose");

// Schema for individual order items
const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true }, // Quantity ordered
    price: { type: Number, required: true }, // Price at the time of the order
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user who placed the order
        items: [orderItemSchema], // Array of order items
        totalAmount: { type: Number, required: true }, // Total price of the order
        shippingAddress: {
            // Delivery address
            street: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "canceled"], // Different order states
            default: "pending",
        },
        placedAt: { type: Date, default: Date.now }, // When the order was placed
        confirmedAt: { type: Date }, // When the order was confirmed
        shippedAt: { type: Date }, // When the order was shipped
        deliveredAt: { type: Date }, // When the order was delivered
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
