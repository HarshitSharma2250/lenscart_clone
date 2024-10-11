const express = require("express");
const  connection  = require("./Configs/db");
const userRouter=require("./routes/user.routes")
const  productRouter  = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const cors = require("cors");
const categoryRouter = require("./routes/category.route");
const orderRouter = require("./routes/order.routes");
const RatingRouter = require("./routes/rating_feedback.routes");


// server initilizing
const server = express();
server.use(
  cors({
    origin: [""],
    methods:["POST","GET"],
    credentials: true
  })
);


server.get("/home", (_, res) => {
  res.send("Welcome Home Page");
});

// defining PORT
const PORT=process.env.PORT||3000

// midlleware
server.use(express.json());
server.use("/api", userRouter);
server.use("/api", productRouter);
server.use("/api", cartRouter);
server.use("/api", categoryRouter);
server.use("/api", orderRouter);
 server.use("/api", RatingRouter);
server.use(express.urlencoded({extended:false}));



// Start the server
server.listen(PORT, async () => {
  try {
    await connection();
    console.log(`Server is running on port ${PORT}`);

  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }

});
