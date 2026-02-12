
import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { userDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {
   const dispatch = userDispatch()
  useEffect(()=>{
    const fetchUser = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getcurrentuser" , {withCredentials})
            dispatch(setUserData(result.data))
        } catch(error){
            console.log(error)
            dispatch(setUserData(null))
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser
