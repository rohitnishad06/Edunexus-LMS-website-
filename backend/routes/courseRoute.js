import express from "express";
import { editCourse, getCourseById, createCourse, getPublishedCourses, getCreatorCourses,removeCourse, createLecture, getCourseLecture, editLecture, removeLecture, getCreatorById } from "../controller/courseController.js";
import isAuth from "../middelware/isAuth.js";
import {upload} from "../middelware/multer.js";
import { get } from "mongoose";
import { searchWithAi } from "../controller/searchController.js";

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

courseRouter.get("/courselecture/:courseId", isAuth,getCourseLecture)

courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("video"),editLecture)

courseRouter.delete("/removelecture/:lectureId",isAuth , removeLecture)

//for search

courseRouter.post("/search",searchWithAi)

courseRouter.post("/creator", isAuth, getCreatorById)


export default courseRouter;
