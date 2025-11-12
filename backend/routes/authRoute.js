import express from "express";
import { login, logOut, signUp } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp); // signup route
authRouter.post("/login", login); // login route
authRouter.post("/logout", logOut); // logout route

export default authRouter;
