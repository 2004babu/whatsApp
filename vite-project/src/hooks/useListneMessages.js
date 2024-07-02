// import React from 'react'

import { useEffect } from "react"
import { useSocketContext } from "../Context/SocketPrivider"

const useListneMessages = () => {
  
const {socket}=useSocketContext()

useEffect(()=>{

socket?.on('hi',(mess)=>{
    console.log(mess);
})
return ()=>socket?.off('newMessage')
},[socket])
}

export default useListneMessages
