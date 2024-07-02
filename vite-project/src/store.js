import {combineReducers, configureStore}from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import authReducer from './Slices/authSlice'
import messageReducer from './Slices/messageSlice'



const reducers=combineReducers({
    authState:authReducer,
    messageState:messageReducer,
})

const store =configureStore({
    reducer:reducers,
    middleware:(middleware)=>middleware(thunk)
})

export default store;