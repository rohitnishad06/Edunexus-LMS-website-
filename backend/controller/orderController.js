import razorpay from "razorpay";
import dotenv from "dotenv";
import courseModel from "../model/courseModel.js";
import userModel from "../model/userModel.js";

dotenv.config();

// Razorpay Instance
const RazorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// razorpay for creating the order
export const razorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "COurse is not Found" });
    }

    const options = {
      amount: course.price * 100,
      currency : "INR",
      receipt: courseId.toString(),
    };

    const order = await RazorPayInstance.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create RazorPay Order ${error}` });
  }
};

// razorpay for verifying the order
export const verifyPayment = async (req, res) => {
  try {
    const { courseId, userId, razorpay_order_id } = req.body;

    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const user = await userModel.findById(userId);

      // checking user enrolled or not
      if (!user.enrolledcourses.includes(courseId)) {
        await user.enrolledcourses.push(courseId);
        await user.save();
      }

      // checking course has student or not
      const course = await courseModel.findById(courseId).populate("lectures");
      if (!course.enrolledStudents.includes(userId)) {
        await course.enrolledStudents.push(userId);
        await course.save();
      } 

      return res.status(200).json({message:"Payment Verified and enrollment successful"})
    }else{
      return res.status(400).json({message:"Payment failed"})
    }

  } catch (error) {
    return res.status(500).json({message:`Internal Server Error During payment Verification ${error}`})
  }
};
