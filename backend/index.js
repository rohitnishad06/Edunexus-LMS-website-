import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// env config
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware config
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", paymentRouter);


// Start Server & Connect Database
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDb();
});
