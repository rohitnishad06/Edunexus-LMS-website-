import uploadCloudinary from "../config/cloudinary.js";
import userModel from "../model/userModel.js";
import courseModel from "../model/courseModel.js";


// GetCurrentUser 
export const getCurrentUser = async(req,res) =>{
  try {
    const user = await userModel.findById(req.userId).select("-password").populate("enrolledcourses");
    if(!user){
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: `getCurrentUser error: ${error}`});
  }
}

export const updateprofile = async(req, res) =>{
  try {
    const userId = req.userId;
    const {description, name} = req.body;
    let photoUrl
    if(req.file){
      photoUrl = await uploadCloudinary(req.file.path)
    }
    const user = await userModel.findByIdAndUpdate(userId, {name, description, photoUrl})

     if(!user){
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({message: `updateprofile error: ${error}`});

  }
}