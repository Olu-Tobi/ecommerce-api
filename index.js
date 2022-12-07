const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe");
const cors = require("cors")



mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("DB Connection Successfull!");
})
.catch((err) => {
    console.log(err);
})

app.use(cors({
    origin: [
        "http://localhost:3000", "https://ecommerce-app-cm1a.onrender.com"
    ],
}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();  // Add this line
})
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});