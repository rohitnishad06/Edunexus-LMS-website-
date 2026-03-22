import mongoose from 'mongoose';

const courseSchema = new mongoose.schema({
    title:{
        type:String,
        requried:true
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String,
        requried:true
    },
    level:{
        type:String,
        enum:["Beginner", "Intermediate", "Advanced"]
    },
    price:{
        type:Number
    },
    thumbnail:{
        type:Number
    },
    enrolledStudents:[{ 
        type:mongoose.Schema.Types.objectId,
        ref:"User"
    }],
    lectures:[{ 
        type:mongoose.Schema.Types.objectId,
        ref:"Lecture"
    }],

    creator:{
        type:mongoose.Schema.Types.objectId,
        ref:"User"
    },

    isPublished:{
        type:Boolean,
        default:false
    },
    reviews:[{
        type:mongoose.Schema.Types.objectId,
        ref:'Review'
    }]
        
},{timestamps:true})



const courseModel = mongoose.model("course" , courseSchema)

export default courseModel;