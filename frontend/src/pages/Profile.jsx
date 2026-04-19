import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";


function Profile() {
  const {userData} = useSelector(state=>state.user)

  const navigate = useNavigate()

  if (!userData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

  const initial = userData?.name?.charAt(0)?.toUpperCase() || "P"
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>

        <FaArrowLeft  className='absolute top-8% left-5% w-22px h-22px cursor-pointer' onClick={()=>navigate("/")}/>
        <div className='flex flex-col items-center text-center'>
          {userData?.photoUrl ? <img src={userData?.photoUrl} className="w-24 h-24 rounded-full border-4 border-black object-cover  
          " alt=""/>:
          <div className='w-24 h-24 rounded-full text-white flex items-center text-[30px] border-4 bg-[#020e26] border-white'>
            <h2>{initial}</h2>
          </div>}
          <h2 className='text-2xl font-bold mt-4 text-gray-800'>{userData?.name || "User"}
          </h2>

          <p className='text-sm text-gray-500'>{userData?.role || "Member"}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-sm  items-center justify-center gap-1">
            <span className='font-semibold text-gray-700'>Email: </span>
            <span>{userData?.email || "Not provided"}</span>
          </div>

          <div className="text-sm  items-center justify-center gap-1">
            <span className="font-semibold text-gray-700">Bio: </span>
            <span>{userData?.description || "No bio added"}</span>
          </div>

          <div className="text-sm  items-center justify-center gap-1">
            <span className="font-semibold text-gray-700">Enrolled Courses: </span>
            <span>{userData?.enrolledCourses?.length || 0}</span>
          </div>
        </div>
        <div className='mt-6 flex justify-center gap-4'>
          <button className='px-5 py-2 rounded bg-[#020e26] text-white active:bg-[#4b4b4b] cursor-pointer transition' onClick={()=>navigate("/edit-profile")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
export default Profile