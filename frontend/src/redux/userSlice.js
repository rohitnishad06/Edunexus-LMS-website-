import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"review",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer
