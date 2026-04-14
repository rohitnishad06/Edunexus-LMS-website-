import e from "express";
import Review from "../model/reviewModel.js";
import Course from "../model/courseModel.js";


export const createReview = async (req, res) => {
    try {
        const { rating, comment, courseId } = req.body;
        const userId = req.userId;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({ message: 'Course is not found' });
        }

        const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this course' });
        }

        const review = new Review({
            course: courseId,
            user: userId,
            rating,
            comment
        });

        await review.save();

        course.reviews.push(review._id); // ❌ no need for await here
        await course.save();

        // ✅ THIS WAS MISSING
        return res.status(200).json({
            success: true,
            message: "Review created successfully",
            review
        });

    } catch (error) {
        return res.status(500).json({
            message: `Failed to create review: ${error.message}`
        });
    }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user course")
      .sort({ createdAt: -1 }); // ✅ FIXED

    return res.status(200).json(reviews);

  } catch (error) {
    console.error("❌ ERROR in getReviews:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
export default {createReview, getReviews};