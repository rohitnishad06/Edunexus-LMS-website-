import express from "express";
import isAuth from "../middelware/isAuth.js";
import { createReview, getReviews } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review", isAuth, createReview);
reviewRouter.get("/getreview", getReviews);


export default reviewRouter;