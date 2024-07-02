import axios from "axios";
import React from "react";
import { format } from "timeago.js";

const SingleMessge = ({ message, id, mymsg }) => {
  return (
    <div
      className={`row${message?.senderId === id ? " " : " flex-row-reverse"} `}
    >
      <div
        className={`p-2 rounded-2 mt-2 col-8 bg-success d-flex align-items-center justify-content-${
          message?.senderId === id ? " " : "end"
        }`}
      >
        <h2 style={{fontSize:'16px'}} className={`${message?.senderId === id ? "ms-3 " : "me-3"}`}>
          {message.message}
        </h2>
      </div>
      <div
        className={`col-4 text-center d-flex align-items-end justify-content-${
          message?.senderId === id ? "start " : " end"
        } gap-1 ${message?.senderId === id ? " flex-row-reverse" : " "}`}
        style={{ fontSize: "10px" }}
      >
        {format(message.createdAt)}{" "}
        <i
          className={`fa-solid fa-arrow-${
            message?.senderId === id ? "left " : "right"
          } text-weight-100`}
        ></i>
      </div>
    </div>
  );
};

export default SingleMessge;
