import React, { useEffect } from "react";
import { useSocketContext } from "../../Context/SocketPrivider";
import { useSelector } from "react-redux";

const ListProfile = ({ user, handleAllChatClick }) => {
  const { socket, onlineUsers } = useSocketContext();
// console.log(user);
  const isOnline = onlineUsers.some((onliner) => {
    return onliner.toString() === user._id.toString();
  });
const {user:loginUser={}}=useSelector(state=>state.authState)
  return (
    <div
      className={`d-flex g-2${isOnline ? "border border-primary-subtle " : ""} `}
      onClick={(e) => handleAllChatClick(e, user._id)}
    >
      <figure className={`figure chat-profile ${isOnline ? "online " : ""}  `}>
        <img
          src={user?.avatar ? user.avatar : "/unknown.png"}
          alt="cake profile"
          className={`img-fluid  ${user?.status.length>0? user?.status[0]?.viewCount?.includes(loginUser?._id) ?'isViewedStatus':"isStatus" :""}`}
        />
      </figure>
      <div className="row justify-content-center m-0 column-gap-0 align-items-start chat-height p-0">
        <h6>{user.name}</h6>
        <p style={{color: isOnline? 'green':"grey"}}>{user?.conversations?.messages[user?.conversations?.messages?.length-1]?.message ? user?.conversations?.messages[user?.conversations?.messages?.length-1]?.message : "Start Conversation"}</p>
      </div>
      <div>
        <h6>yesterDay</h6>
      </div>
    </div>
  );
};

export default ListProfile;
// border border-primary-subtle
