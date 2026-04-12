import uploadCloudinary from "../config/cloudinary.js";
import courseModel from "../model/courseModel.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    const newCourse = await courseModel.create({
      title,
      category,
      description,
      creator: req.userId,
    });

    return res.status(201).json(newCourse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `CreateCourse error: ${error.message}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ isPublished: true })
      .populate("lectures"); 

    if (!courses.length) {
      return res.status(404).json({ message: "Courses not found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find published courses: ${error.message}`,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const courses = await courseModel.find({ creator: userId });

    if (!courses.length) {
      return res.status(404).json({ message: "Course are not found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find creator courses: ${error.message}`,
    });
  }
};


export const editCourse  =async (req,res) =>{
    try {
        const {courseId} = req.params
        const {title,subTitle,description,category,level,isPublished,price} = req.body
        let  thumbnail
        if(req.file){
            thumbnail = await uploadCloudinary(req.file.path)
        }
        let course =await courseModel.findById(courseId)
        if(!course){
      return res.status(404).json({ message: "Course  are not found" }); 
        }
        const updateData = {title,subTitle,description,category,level,isPublished,price,thumbnail}

        course = await Course.findByIdAndUpdate(courseId,updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
return res.status(500).json({
      message: `Failed to edit course: ${error}`
    })
}
}


export const getCourseById = async (req,res) => {
    try {
        const {courseId} =  req.params
         let course =await Course.findById(courseId)
        if(!course){
      return res.status(404).json({ message: "Course  are not found" }); 
        }
        return res.status(200).json(course)

    }catch(error){
       return res.status(500).json({
      message: `Failed to get course by id course: ${error}`
    }) 
    }
}



export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to delete course: ${error.message}`,
    });
  }
};



//for lecture

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "lecture title and courseId are required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save();

    await course.populate("lectures");

    return res.status(201).json({ lecture, course });

  } catch (error) {
    return res.status(500).json({
      message: `Failed create Lecture: ${error.message}`,
    });
  }
};


export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course is not found",
      });
    }

    return res.status(200).json(course);

  } catch (error) {
    return res.status(500).json({
      message: `Failed to getCourseLecture: ${error.message}`,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;   
    const { isPreviewFree, lectureTitle } = req.body;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture is not found",
      });
    }

    if (req.file) {
      const videoUrl = await uploadCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to edit lecture: ${error.message}`,
    });
  }
};


export const removeLecture = async (req, res) => {
  try {
    const {lectureId} = req.params;
    const  lecture= await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return res.status(400).json({ message: "lecture is not found" });
    }


    // remove from course
    await Course.updateOne( 
      {lectures:lectureId},
      {$pull: { lectures: lectureId },
    });

    return res.status(200).json({
      message: "Lecture removed",
    });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to remove Lectures &{error}`
    });
  }
};

//get Creator

export const getCreatorById = async (req, res) => {
  try{
    const{userId} = req.body;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({message:"User is not found"})
    }
    return res.status(200).json(user)
  }catch(error){
    return res.status(500).json({
      message: `Failed to get creator: ${error}`
    });
  }
}