import React, { Fragment, useEffect, useState } from "react";
import ListProfile from "./ListProfile";
import Header from "../layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptUserRequest,
  getUsers,
  loadUser,
  removeFriend,
  removeUserRequest,
  sendRequestUser,
} from "../../Actions/authActions";
import { toast } from "react-toastify";
import { clearError, clearisRequestSend } from "../../Slices/authSlice";

import Footer from "../layouts/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocketContext } from "../../Context/SocketPrivider";

const AddRequest = () => {
  const { socket = {}, onlineUsers, lineUpUsers = [] } = useSocketContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterdusers, setFilterdusers] = useState([]);

  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [component, setCmponent] = useState("search");
  const [friendList, setFriendList] = useState([]);
  const {
    user = {},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
    isRequestSend = null,
  } = useSelector((state) => state.authState);

  const handleAllChatClick = (e, id) => {
    if (e.target.tagName === "IMG" || e.target.tagName === "FIGURE") {
      navigate(`/viewstatus/${id}`, { state: { from: "/" } });
    } else {
      navigate(`/chat/${id}`);
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(loadUser);
    }

    if (!users?.length > 0) {
      dispatch(getUsers);
    }
    if (error) {
      toast.error(error, {
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
  }, [error, dispatch, isRequestSend]);

  useEffect(() => {
    dispatch(getUsers);
  }, []);

 
  const handleAddUser = (id) => {
    dispatch(sendRequestUser({ id }));
    socket?.emit('userRequest',id)
    return ()=> socket?.off('userRequest')

  };
  const handleRemoveUserRequest = (id) => {
    dispatch(removeUserRequest(id));
    socket?.emit('userRequest',id)

    return ()=> socket?.off('userRequest')
  };
  const handleRemoveFriend = (id) => {
   

    if (confirm("Remove Your Friend")) {
      dispatch(removeFriend(id));
      socket?.emit('userRequest',id)

    return ()=> socket?.off('userRequest')
      // console.log("removeFriend");
    }


  };

  useEffect(() => {
    if (users?.length > 0) {
      //search
      let filtered;

      filtered = users?.filter((item) => {
        // console.log(!user?.FriendList?.includes(item._id));
        if (!item?.FriendList?.includes(user._id)) {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
      });
      // console.log(filtered);
      setFilterdusers(filtered);

      //requests
      filtered = users
        ?.map((item) => {
          if (user?.userRequest?.includes(item._id.toString())) {
            // console.log(user?.userRequest,item);
            return item;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);

      setRequests(filtered);
        //friendLISt
        if (users?.some(frined=>frined?.FriendList?.includes(user?._id))) {
        // console.log(users);
        let filter;
        filter = users
        ?.map((item) => {
          if (item?.FriendList?.includes(user?._id)) {
            return item;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
        // console.log(filter);
        // console.log(filter);
        setFriendList(filter);
      } else {
        setFriendList([]);
      }
    }
  }, [search, users, user, isRequestSend,socket]);
  // console.log(requests,user);
  const handleAccept = (id) => {
    if (id) {
      dispatch(acceptUserRequest(id));
      socket?.emit('userRequest',id)
      return ()=> socket?.off('userRequest')
    }
  };
  const handleReject = (id) => {
    dispatch(removeUserRequest(id));
    socket?.emit('userRequest',id)
    return ()=> socket?.off('userRequest')
  };

  useEffect(()=>{

    if (socket) {
  
      socket?.on("", (e) => {
        // dispatch(e);
        console.log('Status',e);
       setTimrequesteout(()=>{
  dispatch(loadUser)
  dispatch(getUsers)
       },200)
      });
  
      return ()=> socket?.off('request')
      
    }
  
  },[socket])

  return (
    <Fragment>
      <header className="d-flex mt-2 p-2 justify-content-between align-items-center">
        <h1 className="" onClick={() => navigate("/")}>
          whatsApp
        </h1>
      </header>
      <div className="p-2 m-1 w-100 h-100 ">
        <div className="form-gruop p-1 mt-1 chat-height ">
          <label htmlFor="searchInput " hidden>
            {" "}
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search "
            id="searchInput"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-4 form-control"
          />
        </div>
        <div className="btn-gruop d-flex gap-2 btn-group-sm">
          <button
            className={`btn btn-${
              component === "search" ? "primary" : "white"
            } border`}
            onClick={() => setCmponent("search")}
          >
            Search
          </button>
          <button
            className={`btn btn-${
              component === "requests" ? "primary" : "white"
            } border`}
            onClick={() => setCmponent("requests")}
          >
            Requests
          </button>
          <button
            className={`btn btn-${
              component === "friendList" ? "primary" : "white"
            } border`}
            onClick={() => setCmponent("friendList")}
          >
            FriendList
          </button>
        </div>

        {component === "search" && (
          <div className=" w-100 row justify-content-between mt-1 p-2 ">
            {filterdusers?.length > 0 ? (
              filterdusers?.map((item) => (
                <div
                  key={item?._id}
                  className={`d-flex g-2 `}
                  //   onClick={(e) => handleAllChatClick(e, user._id)}
                >
                  <figure className={`figure chat-profile `}>
                    <img
                      src={item?.avatar ? item.avatar : "/unknown.png"}
                      alt="cake profile"
                      className={`img-fluid `}
                    />
                  </figure>
                  <div className="row justify-content-center m-0 column-gap-0 align-items-start chat-height p-0">
                    <h6>{item.name}</h6>
                    <p>{item?.bio ? item.bio : ""}</p>
                  </div>
                  <div>
                    {item?.userRequest?.includes(user?._id) ? (
                      <i
                        onClick={() => handleRemoveUserRequest(item?._id)}
                        className="fa-solid fa-user-minus"
                      ></i>
                    ) : (
                      <i
                        onClick={() => handleAddUser(item?._id)}
                        className="fa-solid fa-user-plus"
                      ></i>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex w-100 justify-content-center align-items-center">
                {" "}
                Not Fund User{" "}
              </div>
            )}
          </div>
        )}
        {component === "requests" && (
          <div className="row gap-2">
            {requests?.length > 0 ? (
              requests?.map((user) => (
                <div
                  key={user?._id}
                  className="mt-2 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src={user?.avatar}
                      alt={user?.avatar}
                      height={"50px"}
                      width={"50px"}
                      style={{ borderRadius: "50%" }}
                    />

                    <p className="fs-6">{user?.name}</p>
                  </div>

                  <div className="btn-gruop btn-group-sm  ">
                    <button
                      className="btn btn-success mx-2 p-1"
                      onClick={() => handleAccept(user?._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger p-1 "
                      onClick={() => handleReject(user?._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex w-100 justify-content-center mt-4 align-items-center">
                {" "}
                Not Fund User{" "}
              </div>
            )}
          </div>
        )}
        {component === "friendList" && (
          <div className=" w-100 row justify-content-between mt-1 p-2 ">
            {friendList?.length > 0 ? (
              friendList?.map((item) => (
                <div
                  key={item?._id}
                  className={`d-flex g-2 `}
                  //   onClick={(e) => handleAllChatClick(e, user._id)}
                >
                  <figure className={`figure chat-profile  `}>
                    <img
                      src={item?.avatar ? item.avatar : "/unknown.png"}
                      alt="cake profile"
                      className={`img-fluid `}
                    />
                  </figure>
                  <div className="row justify-content-center m-0 column-gap-0 align-items-start chat-height p-0">
                    <h6>{item.name}</h6>
                  </div>
                  <div>
                    <i
                      onClick={() => handleRemoveFriend(item?._id)}
                      className="fa-solid fa-user-group"
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex w-100 justify-content-center align-items-center">
                {" "}
                Not Fund User{" "}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default AddRequest;
