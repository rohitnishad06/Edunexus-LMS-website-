import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';

function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async (e) => {
    setLoading(true);
    try{
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, {withCredentials: true});
      console.log(result.data);
      navigate('/courses');
      setLoading(false);
      toast.success("Course created successfully");
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
        <FaArrowLeft className='w-[22px] absolute top-[8%] left-[5%] h-[22px] cursor-pointer' onClick={()=>navigate('/courses')} />
        <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>
        <form className='space-y-5' onSubmit={(e)=> e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
            <input type="text" id="title" placeholder='Enter Courses title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' onChange={(e) => setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
            <select id='cat' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' onChange={(e) =>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Designing">UI/UX Designing</option>
              <option value="App Development">App Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Data Analysis">Ai Tools</option>
              <option value="DevOps">DevOps</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button className='w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' disabled={loading} onClick={handleCreateCourse}>{loading? <ClipLoader size={20} color="white" /> : "Create Course"}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses
