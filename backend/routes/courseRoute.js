import express from "express";
import { editCourse, getCourseById, createCourse, getPublishedCourses, getCreatorCourses,removeCourse, createLecture, getCourseLecture, editLecture, removeLecture } from "../controller/courseController.js";
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


//for lectures 

courseRouter.post("/createlecture/:courseId", isAuth,createLecture)

courseRouter.post("/createlecture/:courseId", isAuth,getCourseLecture)

courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"),editLecture)

courseRouter.delete("/removelecture/:lectureId",isAuth , removeLecture)
export default courseRouter;
