import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'
import Home from './pages/home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverUrl = "http://localhost:8000";
import{ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import { MdDashboard } from 'react-icons/md'
import Dashboard from './pages/Educator/Dashbord'

function App() {

   const {userData} = useSelector(state=>state.user)

    getCurrentUser();
    return (
        <>
        <ToastContainer />
            <Routes>
                <Route path='/' element={userData ? <Home/>:<Navigate to ={"/login"}/>}/>
                <Route path='/login' element={!userData ? <Login/> : <Navigate to ={"/"}/>}/>
                <Route path='/signup' element={!userData ? <SignUp/>: <Navigate to ={"/"}/> } />
                <Route path='/profile' element={userData ? <Profile/>: <Navigate to={"/login"}/>}/>
                <Route path='/forget' element={!userData ? <ForgetPassword/> : <Navigate to={"/"}/>}/>
                <Route path='/edit-profile' element={userData ? <EditProfile/> : <Navigate to={"/signup"}/>}/>
                <Route path='/dashboard' element={userData?.role === "educator" ?  <Dashboard/> : <Navigate to={"/signup"}/>}/>
                <Route path='/courses' element={userData?.role === "educator" ?  <Courses/> : <Navigate to={"/signup"}/>}/>
                <Route path='/ create course' element={userData?.role === "educator" ?  < CreateCourses/> : <Navigate to={"/signup"}/>}/>
          
          
          


          
            </Routes>
        </>
    )
}

export default App