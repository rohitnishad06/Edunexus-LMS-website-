import express from "express";
import { login, logOut, signUp, sendOTP, resetPassword,verifyOTP } from "../controller/authController.js";


const authRouter = express.Router();

authRouter.post("/signup", signUp); // signup route
authRouter.post("/login", login); // login route
authRouter.post("/logout", logOut); // logout route
authRouter.post("/sendotp",sendOTP)
authRouter.post("/verifyotp", verifyOTP);
authRouter.post("/resetpassword",resetPassword)



export default authRouter;
