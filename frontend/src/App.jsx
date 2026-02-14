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

function App() {
    getCurrentUser()
   const {userData} = useSelector(state=>state.user)
    return (
        <>
        <ToastContainer />
            <Routes>
                <Route path='/' element={userData ? <Home/>:<Navigate to ={"/signup"}/>}/>
                <Route path='/signup' element={!userData ? <SignUp/>: <Navigate to ={"/"}/> } />
                <Route path='/login' element={!userData ? <Login/> : <Navigate to ={"/"}/>}/>
                <Route path='/profile' element={userData ? <Profile/>: <Navigate to={"/login"}/>}/>
                <Route path='/forget' element={!userData ? <ForgetPassword/> : <Navigate to={"/"}/>}/>

            </Routes>
        </>
    )
}

export default App