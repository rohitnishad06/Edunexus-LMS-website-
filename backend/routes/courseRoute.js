import express from "express";
import { editCourse, getCourseById, createCourse, getPublishedCourses, getCreatorCourses,removeCourse } from "../controller/courseController.js";
import isAuth from "../middelware/isAuth.js";
import {upload} from "../middelware/multer.js";

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
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);

courseRouter.get("/getcourses/:courseId",isAuth , getCourseById)

export default courseRouter;
