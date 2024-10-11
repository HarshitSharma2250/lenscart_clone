const {Router}=require("express")
const RatingRouter = Router();
const {verifyToken,Authorization}=require("../middlwares/authenticate.middleware")
const addRatingFeedback=require("../controllers/rating_feedback.controller")


RatingRouter.post("/user/product/rating",verifyToken,Authorization(["customer"]),addRatingFeedback)


module.exports =  RatingRouter
