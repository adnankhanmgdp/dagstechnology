import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone: null,
    email:null
}

const phoneSlice = createSlice({
    name:'phone',
    initialState,
    reducers:{
        phoneInSuccess : (state,action)=>{
            state.phone = action.payload;
        },
        emailInSuccess : (state,action)=>{
            state.email = action.payload;
        }
    }
})

export const {phoneInSuccess,emailInSuccess} = phoneSlice.actions;
export default phoneSlice.reducer