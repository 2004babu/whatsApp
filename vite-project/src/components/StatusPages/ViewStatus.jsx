import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { sendSingleMessage } from "../../Actions/messageActions";
import { getUsers, loadUser } from "../../Actions/authActions";
import { useSocketContext } from "../../Context/SocketPrivider";

const ViewStatus = () => {
  const dispatch = useDispatch();
  const { socket = {} } = useSocketContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusUser, setStatusUser] = useState(null);
  const [message, setMessage] = useState("");
  const videoRef = useRef();
  const location = useLocation();
  const {
    user = {},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);

  useEffect(() => {
    let filtered;
    if (users.length > 0) {
      filtered = users.filter((item) => item._id === id);
      setStatusUser(...filtered);
    }
    // console.log(filtered);
    if ((user && !filtered) || !filtered?.length > 0) {
      console.log("fdddd");

      setStatusUser(user);
    }
console.log(user);
    if (!user._id) {
      dispatch(loadUser);
    }
  }, [users]);
  // console.log(statusUser);

  const handlePlayPuase = () => {
    dispatch(getUsers)
  
    if (location?.state?.from === "/") {
      navigate("/");
    } else if (location?.state?.from === "/allstatus") {
      navigate("/allstatus");
    }
  };

  useEffect(() => {
    const handleVideoEnd = () => {
      console.log("Video ended");
      dispatch(getUsers)
      if (location?.state?.from === "/") {
        navigate("/");
      } else if (location?.state?.from === "/allstatus") {
        navigate("/allstatus");
      }
      // console.log('log');
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      console.log("jiii");
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (videoElement) {
        console.log("enn");
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [navigate, videoRef]);

  // console.log(user?._id, id);
  const handleMessage = (e) => {
    e.preventDefault();
    if (!user._id) {
      dispatch(loadUser);
    }




    if (user) {
      dispatch(sendSingleMessage(message, id));
      setMessage("");
      socket?.emit("sendMessage", {
        message,
        id: statusUser?._id,
        senderId: user?._id,
        users,
      });
    }
  };
  return (
    <Fragment>
      {statusUser && statusUser.status && statusUser.status.length > 0 ? (
        <Fragment>
          <div className="position-absolute w-100 p-2 poiter  d-flex gap-5 mt-4 justify-content-start align-items-center ">
            <i className=" text-white fa-solid fa-arrow-left fs-1 "></i>
            <div className="d-flex gap-2 align-items-center ">
              <img
                className="myStatus"
                height={"60px "}
                width={"60px"}
                src={statusUser?.avatar}
                alt=" myStatus"
              />
              <div className="row gap-1">
                <h5 className="fw-bold fs-1 text-white">{statusUser?.name}</h5>
                <p className="fw-bolder  fs-5 text-white">{statusUser?.name}</p>
              </div>
            </div>
          </div>

          <video
            src={statusUser?.status[0]?.Status}
            className=" w-100 video "
            height={"101%"}
            playsInline
            autoPlay
            ref={videoRef}
            onClick={handlePlayPuase}
          ></video>
          {user?._id === id ? (
            <Fragment>
              <h4 className="viewCounter m-0">
                <i className="fw-bold fa-regular fa-eye">
                  {statusUser?.status[0]?.viewCount?.length ?? null}
                </i>
              </h4>
            </Fragment>
          ) : (
            <form className="from-group viewCounter p-0 m-0  w-100 ">
              <input
                type="text"
                name=""
                id=""
                className="form-control p-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-success sendMessage m-0 "
                onClick={handleMessage}
              >
                {" "}
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ViewStatus;
