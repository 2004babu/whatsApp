import React, { useEffect } from "react";
import { useSocketContext } from "../../Context/SocketPrivider";

const ListProfile = ({ user, handleAllChatClick }) => {
  const { socket, onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.some((onliner) => {
    return onliner.toString() === user._id.toString();
  });


  return (
    <div
      className={`d-flex g-2${isOnline ? "border border-primary-subtle " : ""} `}
      onClick={(e) => handleAllChatClick(e, user._id)}
    >
      <figure className={`figure chat-profile ${isOnline ? "online " : ""}  `}>
        <img
          src={user?.avatar ? user.avatar : "/unknown.png"}
          alt="cake profile"
          className="img-fluid "
        />
      </figure>
      <div className="row justify-content-center m-0 column-gap-0 align-items-start chat-height p-0">
        <h6>{user.name}</h6>
        <p>{isOnline ? "online" : "Offline"}</p>
      </div>
      <div>
        <h6>yesterDay</h6>
      </div>
    </div>
  );
};

export default ListProfile;
// border border-primary-subtle
