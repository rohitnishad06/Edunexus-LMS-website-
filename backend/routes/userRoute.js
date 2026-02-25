import express from "express";
import { getCurrentUser, updateprofile } from "../controller/userController.js";
import isAuth from "../middelware/isAuth.js";
import { upload } from "../middelware/multer.js";


const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.post("/profile", isAuth, upload.single("photoUrl"), updateprofile);

export default userRouter;
