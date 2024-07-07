import React, { Fragment, useEffect, useState } from "react";
import ListProfile from "./ListProfile";
import Header from "../layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, login } from "../../Actions/authActions";
import { toast } from "react-toastify";
import { clearError } from "../../Slices/authSlice";

import Footer from "../layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { useSocketContext } from "../../Context/SocketPrivider";

const AllChat = () => {

  const { socket = {}, onlineUsers, lineUpUsers = [] } = useSocketContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterdusers, setFilterdusers] = useState([]);
  const {
    user = {},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);

  const handleAllChatClick = (e, id) => {
    if (e.target.tagName === "IMG" || e.target.tagName === "FIGURE") {
    } else {
      console.log(id);
      navigate(`/chat/${id}`);
    }
  };

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

  useEffect(() => {
    let filtered = [];

    if (lineUpUsers.senderId && users.length) {
      lineUpUsers.Receiverids.forEach((item) => {
        users.forEach((value) => {
          if (value._id === item) {
            filtered.push(value);
          }
        });
      });
      console.log("ff", filtered);
      filtered = filtered.reverse();
      users.forEach((user) => {
        if (!filtered.some((filteredUser) => filteredUser._id === user._id)) {
          filtered.push(user);
        }
      });

      setFilterdusers(filtered);
    } else {
      if (!filterdusers.length > 0&&users.length>0) {
        if (user?.lineUpList) {
          // console.log();
          user.lineUpList.Receiverids.forEach((item) => {
            users?.forEach((value) => {
              if (value._id === item) {
                filtered.push(value);
              }
            });
          });
          console.log(filtered);
          filtered = filtered.reverse();
          users.forEach((user) => {
            if (!filtered.some((filteredUser) => filteredUser._id === user._id)) {
              filtered.push(user);
            }
          });
          setFilterdusers(filtered)
        }
      }
    }
  }, [users, socket, lineUpUsers, user]);

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
          {filterdusers.length > 0
            ? filterdusers.map((user) => (
                <ListProfile
                  key={user._id}
                  user={user}
                  handleAllChatClick={handleAllChatClick}
                />
              ))
            : users.length > 0 &&
              users.map((user) => (
                <ListProfile
                  key={user._id}
                  user={user}
                  handleAllChatClick={handleAllChatClick}
                />
              ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AllChat;
