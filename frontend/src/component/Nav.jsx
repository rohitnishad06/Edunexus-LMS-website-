import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelecter } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {serverUrl } from '../App';
import {setUserData} from '../redux/userSlice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

function Nav() {
  const {userData} = useSelecter(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show,setshow] = useState(false)
  const [showHam,setShowHam] = useState(false)

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout` , {withCredentials:true})
      dispatch(setUserData(null))
      console.log(result.data)
      toast.success("LogOut Succesfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    }
  }
  return (
    <div >
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w[20%] w-[40%] lg:pl-[50px] '>
          <img src={logo} alt="" className='w-[50px] rounded-[5px] border-2 border-white '/>
        </div>
        <div className='w-[30%] lg:flex items-center
        justify-center gap-4 hidden'>


        {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer'  onClick={()=>setshow(prev=>!prev)}/>}
        {userData &&<div className='w-[50px] h-[50px] rounded-full text-whiteflew items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'  onClick={()=>setshow(prev=>!prev)}>
          {userData?.name.slice(0,1).toUpperCase()}
        </div>}

         {userData?.role=== "educator" && <div className='px-[20px] py-[10x] border-2  border-white border-black  text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer'>Dashboard</div>}
        
         { !userData ?<span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#00000045]'onClick={()=>navigate("/login")}>Login</span>:
         <span className='px-[20px] py-[10x] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogOut}>LogOut</span>}
         { show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
          <span className=' bg-black text-white px-[30px] py-[10px] rounded-2x1 hover:bg-gray-600' onClick={()=>navigate("/profile")}>My Profile</span>
          <span className=' bg-black text-white px-[30px] py-[10px] rounded-2x1 hover:bg-gray-600'>My Courses</span>
         </div>}
         
          </div>
          <RxHamburgerMenu className='w-[35px] h-[35px] lg:hidden text-black cursor-pointer' onClick={()=>setShowHam (prev=>!prev)}/>

          <div className={`fixed top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center flex-col gap-5 z-10 lg:hidden $ {showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}></div>
           <GiSplitCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%] ' onClick={()=>setShowHam (prev=>!prev)}/>
             {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer'  />}
            {userData &&<div className='w-[50px] h-[50px] rounded-full text-whiteflew items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'>
             {userData?.name.slice(0,1).toUpperCase()}
        </div>}
        <div className='w-[200px] h-[65px] border-2  border-white  text-white bg-[black] flex-items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/profile")}>My Profile</div>
        <div className='w-[200px] h-[65px] border-2  border-white  text-white bg-[black] flex-items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'>My Courses</div>
        {userData?.role=== "educator" && <div className='w-[200px] h-[65px] border-2  border-white   text-white bg-[black] flex-items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'>Dashboard</div>}
        { !userData ?<span className='w-[200px] h-[65px] border-2  border-white  text-white bg-[black] flex-items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/login")}>Login</span>:
         <span className='w-[200px] h-[65px] border-2  border-white  text-white bg-[black] flex-items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer' onClick={handleLogOut}>LogOut</span>}
        </div>
    </div>

  )
}

export default Nav
