import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate=useNavigate()
  return (
    <footer className=" w-100 d-flex justify-content-evenly  position-fixed bottom-0 ">
    <div onClick={()=>navigate('/')} className="text-center">
      <i className="fa-brands fa-rocketchat p-0  m-2"></i>
      <p className="p-0 m-1 footer-text bg-success">Chats</p>
    </div>
    <div className="text-center">
      <i className="fa-solid fa-spinner p-0  m-2"></i>
      <p className="p-0 m-1 footer-text  bg-success ">Status</p>
    </div>
    <div onClick={()=>navigate('/profile')} className="   text-center ">
      <i className="fa-solid fa-user p-0  m-2"></i>
      <p className="p-0 footer-text  bg-success">Profile</p>
    </div>
  </footer>
  )
}

export default Footer
