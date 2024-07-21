import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSocketContext } from '../../Context/SocketPrivider'
import { getUsers, loadUser } from '../../Actions/authActions'

const Header = () => {

  const navigate=useNavigate()
  const handleAddUser=()=>{

navigate('/addrequest')
  }
const {user={},users={}}=useSelector(state=>state.authState)
const {socket={}}=useSocketContext()
const dispatch=useDispatch()
useEffect(()=>{

  if (socket) {

    socket?.on("request", (e) => {
      // dispatch(e);
      console.log('Status',e);
     setTimeout(()=>{
dispatch(loadUser)
     },200)
    });

    return ()=> socket?.off('request')
    
  }

},[socket])

// let filter
// useEffect(()=>{

// if (users?._id) {
//   filter=users?.some(item=>item?.userRequest?.includes(user?._id))
//   console.log(filter);
// }

// },[users,user])
  return (
    <header className="d-flex mt-2 p-2 justify-content-between align-items-center">
      <h1 className=''>whatsApp</h1>
      <i onClick={handleAddUser} className={`fa-solid fa-user-plus ${user?.userRequest?.length>0 ?'request' :""}`}></i>
    </header>
  )
}

export default Header
