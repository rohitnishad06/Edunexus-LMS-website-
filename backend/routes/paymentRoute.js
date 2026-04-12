import express from "express";
import { razorpayOrder, verifyPayment } from "../controller/orderController.js";

const paymentRouter = express.Router();

paymentRouter.post("/razorpay-order", razorpayOrder);
paymentRouter.post("/verifypayment", verifyPayment);

export default paymentRouter;
