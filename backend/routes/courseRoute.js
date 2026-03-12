import express from "express";
import {createCourse, getPublishedCourses, getCreatorCourses,removeCourse} from "../controllers/courseController.js";
import isAuth from "../middlewares/isAuthenticated.js";
import { editCourse, getCourseById } from "../controller/courseController.js";

const courseRouter = express.Router();

// create course
courseRouter.post("/create", isAuth, createCourse);

// get all published courses
courseRouter.get("/getpublished", getPublishedCourses);

// get courses created by logged-in user
courseRouter.get("/getcreator", isAuth, getCreatorCourses);

// delete course
courseRouter.delete("/remove/:courseId", isAuth, removeCourse);

// edit course
courseRouter.delete("/editcourse/:courseId", isAuth, upload.single('thumbnail'),editCourse);

courseRouter.get("/getcourses/:courseId",isAuth , getCourseById)
export default router;
