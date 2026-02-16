import express from "express";
import { login, logOut, signUp, sendOTP, resetPassword,verifyOTP, googleAuth } from "../controller/authController.js";


const authRouter = express.Router();

authRouter.post("/signup", signUp); // signup route
authRouter.post("/login", login); // login route
authRouter.get("/logout", logOut); // logout route
authRouter.post("/sendotp",sendOTP)
authRouter.post("/verifyotp", verifyOTP);
authRouter.post("/resetpassword",resetPassword)
authRouter.post("/googleauth",googleAuth)



export default authRouter;
