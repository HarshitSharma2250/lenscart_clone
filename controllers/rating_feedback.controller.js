const RatingFeedback = require('../Models/userRating_feedback.model'); // Adjust the path according to your project structure
const Product = require('../Models/product.model'); // Import the Product model to verify product existence
const User = require('../Models/user.model'); // Import the User model to verify user existence

const addRatingFeedback = async (req, res) => {
    const { productId, rating, feedback } = req.body; // Destructure data from request body
    const userId = req.user._id; // Assuming the user ID is available in req.user

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user exists (optional, based on your application logic)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new rating and feedback document
        const newRatingFeedback = new RatingFeedback({
            productId,
            userId,
            rating,
            feedback,
        });

        // Save the rating and feedback to the database
        await newRatingFeedback.save();

        res.status(201).json({
            message: 'Rating and feedback added successfully',
            data: newRatingFeedback,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = addRatingFeedback 
