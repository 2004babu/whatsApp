import React, { Fragment, useEffect } from "react";
import ListProfile from "./ListProfile";
import Header from "../layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, login } from "../../Actions/authActions";
import { toast } from "react-toastify";
import { clearError } from "../../Slices/authSlice";

import Footer from "../layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom";



const AllChat = () => {
  // const {socket,onlineUsers}=useSocketContext()
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const {
    user={},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);
  

  const handleAllChatClick =(e,id)=>{
    if(e.target.tagName==='IMG'||e.target.tagName==='FIGURE'){
    }else{

      console.log(id);
      navigate(`/chat/${id}`)
    }
  }

  useEffect(() => {
    dispatch(getUsers);
    if (error) {
      toast.error(error, {
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
  }, [error, dispatch]);
// console.log(users);
  return (
    <Fragment>
      <Header />
      <div className="p-2 m-1 w-100 h-100">
        <div className="form-gruop p-1 mt-1 chat-height ">
          <label htmlFor="searchInput " hidden>
            {" "}
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search "
            id="searchInput"
            className="p-3 rounded-4 form-control"
          />
        </div>
        <div className=" w-100 row justify-content-between mt-1 p-2 ">
          
          { users.length>=0 &&users.map(user=><ListProfile key={user._id} user={user} handleAllChatClick={handleAllChatClick} />)}
          
          
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default AllChat;
