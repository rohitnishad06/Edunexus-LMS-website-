import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";

// env config
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware config
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// Root route to test if server is running
app.get("/", (req, res) => {
  res.send("server is working properly...");
});

// Start Server & Connect Database
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDb();
});
