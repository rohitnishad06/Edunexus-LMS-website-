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
            </Routes>
        </>
    )
}

export default App