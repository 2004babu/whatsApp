import React, { Component, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../Context/SocketPrivider";
import Footer from "../layouts/Footer";
import {
  deleteStatus,
  getUsers,
  loadUser,
  viewCounter,
} from "../../Actions/authActions";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { clearStatusUploaded } from "../../Slices/authSlice";
import { format } from "timeago.js";

const AllStatus = () => {
  const { socket = {}, onlineUsers, lineUpUsers = [] } = useSocketContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusUser, setStatusUser] = useState([]);

  const options = ["Delete"];

  const {
    user = {},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
    isStatusUploaded = null,
  } = useSelector((state) => state.authState);

  const handleOpenStatus = (status, userID, e, statusId) => {
    if (user._id === userID && !user.status.length > 0) {
      navigate("/upload/status");
      return;
    } else {
      // console.log('es;');
    }

   
    if (e?.target?.tagName === "I") {
      return;
    }

    const taglist = ["UL", "LI"];
    if (taglist.includes(e?.target?.tagName)) {
      dispatch(deleteStatus(statusId));
    } else {
      navigate(`/viewstatus/${userID}`, { state: { from: "/allstatus" } });
      dispatch(viewCounter({ statusOwner: userID }));
    }

  };

  useEffect(() => {
    
    if (!user._id) {
      dispatch(loadUser);
    }
    if (isStatusUploaded) {

      dispatch(loadUser);
      dispatch(clearStatusUploaded());
    }
    if (users?.length > 0) {
      let filtered;
      filtered = users
        ?.map((item) => {
          if (
            user?.FriendList?.includes(item._id) &&
            item.status[0]?.Status?.length > 0
          ) {
            return item;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
      setStatusUser(filtered);
    }
  }, [users, isStatusUploaded]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    if (socket) {
      socket?.on("Status", (e) => {
        dispatch(getUsers);
        // console.log('Status',e);
      });
     
      return () =>{ socket?.off("Status")
       
      }
    }
  }, [socket, dispatch]);
  return (
    <Fragment>
      <div className="status  h-100 w-100 p-3">
        <h1 className="mt-4 ms-4">Status</h1>

        <div
          onClick={(e) =>
            handleOpenStatus(
              user?.status[0]?.Status,
              user?._id,
              e,
              user?.status[0]?._id
            )
          }
          className="w-100  d-flex gap-3  p-2 mt-2 justify-content-between align-items-center"
        >
          <div className=" gap-3 d-flex ">
            {" "}
            <img
              src={user?.avatar ? user?.avatar : "unknown.png"}
              alt="my"
              height={"60px "}
              width={"60px"}
              className={`myStatus ${
                user?.status?.length > 0 ? "isStatus" : ""
              }`}
            />
            <h1 className="mt-2">My Status</h1>
          </div>

          {user?.status?.length > 0 && (
            <>
              <div className=" position-relative">
                <i
                  className=" fs-4 fa-solid fa-ellipsis-vertical cursor-pointer"
                  onClick={toggleDropdown}
                ></i>
                {dropdownOpen && (
                  <div className="dropdownContainer">
                    <ul className="list-group text-decoration-none">
                      {/* <li  className="list-group-item ">Edit</li> */}
                      <li className="list-group-item">Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <h6 className="text-secondary mt-3"> Recenlty Updates</h6>
        {statusUser.length > 0
          ? statusUser.map(
              (item) =>
                item.status[0]?.Status?.length > 0 && (
                  <Fragment key={item._id}>
                    <div
                      onClick={() =>
                        handleOpenStatus(
                          item?.status[0].Status,
                          item?._id,
                          null
                        )
                      }
                      className="w-100  justify-content-start align-items-center  d-flex gap-3  p-2 mt-2"
                    >
                      <img
                        src={item.avatar ? item.avatar : "./unknown.png"}
                        alt="my"
                        height={"60px "}
                        width={"60px"}
                        className={`myStatus ${
                          item?.status.length > 0 &&
                          !item?.status[0]?.viewCount?.includes(user._id)
                            ? "isStatus"
                            : "isViewedStatus"
                        }`}
                      />

                      <div className="h-100 row d-flex justify-content-start align-items-start">
                        <h1 className="mt-2">{item.name}</h1>
                        <p>{format(item?.status[0]?.createAt)}</p>
                      </div>
                    </div>
                  </Fragment>
                )
            )
          : ""}
      </div>
      <Footer />
    </Fragment>
  );
};

export default AllStatus;
