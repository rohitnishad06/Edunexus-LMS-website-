import React from 'react'
import {Navigate, Route , Routes } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
export const serverUrl = "http://localhost:8000";
import{ToastContainer} from "react-toastify";
import { useSelector } from 'react-redux';
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword';
import Courses from './pages/Educator/Courses';
import CreateCourses from './pages/Educator/CreateCourses';
import Dashboard from './pages/Educator/Dashbord';
import getCreateCourse from './customHooks/getCreateCourse';
import EditProfile from './pages/EditProfile';
import EditCourses from './pages/Educator/EditCourses';
import useGetCurrentUser from './customHooks/getCurrentUser';
import getPublishedCourse from './customHooks/getPublishedCourse';
import AllCourses from './pages/AllCourses';
import CreateLecture from './pages/Educator/CreateLecture';
import EditLecture from './pages/Educator/EditLecture';
import ViewCourse from './pages/ViewCourse';
import ScrollToTop from './component/ScrollToTop';
import ViewLectures from './pages/ViewLectures';
import MyEnrolledCourses from './pages/MyEnrolledCourses';
import getAllReviews from './customHooks/getAllReviews';

function App() {
    useGetCurrentUser();
    getCreateCourse();
    getPublishedCourse();
    getAllReviews();

   const {userData} = useSelector(state=>state.user)
    return (
        <>
        <ToastContainer />
        <ScrollToTop />
            <Routes>
                <Route path='/' element={userData ? <Home/>:<Navigate to ={"/login"}/>}/>
                <Route path='/login' element={!userData ? <Login/> : <Navigate to ={"/"}/>}/>
                <Route path='/signup' element={!userData ? <SignUp/>: <Navigate to ={"/"}/> } />
                <Route path='/profile' element={userData ? <Profile/>: <Navigate to={"/login"}/>}/>
                <Route path='/forget' element={!userData ? <ForgetPassword/> : <Navigate to={"/"}/>}/>
                <Route path='/edit-profile' element={userData ? <EditProfile/> : <Navigate to={"/signup"}/>}/>
                <Route path='/allcourses' element={userData ? <AllCourses/> : <Navigate to={"/signup"}/>}/> 
                <Route path='/dashboard' element={userData?.role === "educator" ?  <Dashboard/> : <Navigate to={"/signup"}/>}/>
                <Route path='/courses' element={userData?.role === "educator" ?  <Courses/> : <Navigate to={"/signup"}/>}/>
                <Route path='/createcourse' element={userData?.role === "educator" ?  < CreateCourses/> : <Navigate to={"/signup"}/>}/>  
                <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourses/> : <Navigate to={"/signup"}/>}/>
                <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture/> : <Navigate to={"/signup"}/>}/>
                <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture/> : <Navigate to={"/signup"}/>}/>
                <Route path='/viewcourse/:courseId' element={userData ? <ViewCourse/> : <Navigate to={"/login"}/>}/>
                <Route path='/viewlecture/:courseId' element={userData? <ViewLectures/> : <Navigate to={"/signup"}/>}/>
                <Route path='/mycourses' element={userData? <MyEnrolledCourses/> : <Navigate to={"/signup"}/>}/>
            </Routes>
        </>
    )
}

export default App