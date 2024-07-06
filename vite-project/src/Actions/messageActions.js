import axios from 'axios'
import {  sendMessageRequest, sendMessageSuccess, sendMessageFail } from"../Slices/messageSlice.js";

export const sendSingleMessage=(message,id)=>async(dispatch)=>{
    try {
        const config={
            Headers:{
                'Content-Type':'application/json'
            }
            ,withCredentials:true
        }

        dispatch(sendMessageRequest())
        const {data}=await axios.post(`/api/message/send/${id}`,{message},config)
        console.log(data);
        dispatch(sendMessageSuccess(data))
    } catch (error) {
        console.log('errror in get meessage Actions',error.message);
        dispatch(sendMessageFail(error?.response?.data?.message))
    }
}
export const GetAllCoversationMessage=(id)=>async(dispatch)=>{
    try {
        const config={
            Headers:{
                'Content-Type':'application/json'
            }
            ,withCredentials:true
        }

        dispatch(sendMessageRequest())
        const {data}=await axios.post(`/api/message/${id}`,{},config)
        
        dispatch(sendMessageSuccess(data))
        console.log(data);

    } catch (error) {
        console.log('errror in get meessage Actions',error.message);
        dispatch(sendMessageFail(error?.response?.data?.message))
    }
}
