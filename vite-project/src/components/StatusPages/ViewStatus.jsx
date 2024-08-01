import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { sendSingleMessage } from "../../Actions/messageActions";
import { getUsers, loadUser, viewCounter } from "../../Actions/authActions";
import { useSocketContext } from "../../Context/SocketPrivider";
import { filter } from "lodash";
import { useStatusUserList } from "../../Context/StatusProvider";

const ViewStatus = () => {
  const dispatch = useDispatch();
  const { socket = {} } = useSocketContext();
  const { statusUser, setStatusUser } = useStatusUserList();
  const container = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStatusUser, setCurrentStatusUser] = useState(null);
  const [message, setMessage] = useState("");
  const videoRef = useRef();
  const location = useLocation();
  const [startY, setStartY] = useState(null);
  const [endY, setEndY] = useState(null);
  const [videoendY, setVideoEndY] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const [statusViewUSer, setStatusViewUSer] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [count, setCount] = useState(0);
  const [statusUserIndex, setStatusUSerIndex] = useState(0);
  const isMyStstus = location?.state?.isMyStstus ? true : false;

  const {
    user = {},
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);

  // console.log(statusUser);

  useEffect(() => {
    let filtered;
    // if (users.length > 0&&currentStatusUser?.length>0) {
    //   filtered = users.filter((item) => item._id === id);
    //   setCurrentStatusUser(...filtered);
    // }
    // statusUser.some(item=>{
    //   console.log(item._id.toString()===id.toString());
    // });

    // console.log(statusUser.map(item=> { item._id.toString()===id.toString()}))

    if (isMyStstus && user?._id) {
      setCurrentStatusUser(user);
    }
    if (!user._id) {
      dispatch(loadUser);
    }
    if (currentStatusUser) {
      let countF = 0;

      countF = currentStatusUser?.status?.filter((item) => {
        return item.viewCount.includes(user?._id);
      });
      //  console.log(currentStatusUser?.status?.length === countF.length);
      //  console.log(currentStatusUser?.status?.length ,countF);
      if (currentStatusUser?.status?.length === countF.length) {
        setCount(0);
      } else {
        setCount(countF.length > 0 ? countF.length - 1 :  0);
      }
      // console.log(countF.length);
    }
  }, [users, currentStatusUser]);

  useEffect(() => {
    // console.log( users);
    if (currentStatusUser && users?.length > 0) {
      let filtered;
      filtered = users?.filter((item) =>

        user?.status[count ?? 0]?.viewCount.includes(item._id.toString())
      );
      // console.log(filtered);
      setStatusViewUSer(filtered);
    }
  }, [count, users]);
  // console.log('statusUserIndex',statusUserIndex);
  // console.log(count);

  const handlePlayPuase = () => {
    if (showDiv) {
      setStartY(null);
      setShowDiv(!showDiv);
      setTimeout(() => {
        setEndY(null);
      }, 100);
      // setEndY(null);
      return;
    }
    // currentStatusUser?.status?.length - count < currentStatusUser?.status?.length
    
    // console.log(statusUserIndex);
    if ( currentStatusUser?.status?.length > 1) {
      // console.log("entered");
      if ((videoRef.current?.clientWidth * 50) / 100 <= videoendY) {
        console.log("right");
        // console.log(count);
        // console.log(count < currentStatusUser?.status?.length - 1);
        if (count < currentStatusUser?.status?.length - 1) {
          setCount(count + 1);

          if (!statusUser[statusUserIndex]?.status[count]?.viewCount.includes(user?._id)) {
            console.log("send");
            handleSubmitViewCount(currentStatus?._id);
          }
        } else if (!isMyStstus&& statusUserIndex < statusUser?.length - 1) {
          setStatusUSerIndex(statusUserIndex + 1);
          console.log(
            "statusUserIndex",
            statusUserIndex,
            statusUser[statusUserIndex]
          );
        } else {
          console.log("redirect allstatus");
          navigate("/allstatus");
        }
      } else {
        if (count >= 1) {
          console.log("left");

          setCount(count - 1);

          if (!currentStatus?.viewCount.includes(user?._id)) {
            console.log("send");
            handleSubmitViewCount(currentStatus?._id);
          }
        } else if (statusUserIndex !== 0) {
          setStatusUSerIndex(statusUserIndex - 1);
        }
      }
      return;
    } else if (user?._id !== id) {
      console.log("finish");
      if (!statusUser[statusUserIndex]?.status[count]?.viewCount.includes(user?._id)) {
        console.log("send");
        handleSubmitViewCount(currentStatus?._id);
      }
      setStatusUSerIndex(statusUserIndex + 1);
      return;
    }

    // dispatch(getUsers);
    if (location?.state?.from === "/") {
      navigate("/");
    } else if (location?.state?.from === "/allstatus") {
      navigate("/allstatus");
    }
  };
  // console.log(statusUser[statusUserIndex]);

  useEffect(() => {
    // console.log(statusUserIndex);
    setCurrentStatusUser(statusUser[statusUserIndex]);
  }, [statusUserIndex]);
  // console.log(statusUserIndex,currentStatusUser);
  useEffect(() => {
    const handleVideoEnd = () => {
      console.log("Video ended");
      console.log(currentStatusUser?.status?.length - 1);
      if (count < currentStatusUser?.status?.length - 1) {
        setCount(count + 1);
        if (!currentStatus?.viewCount.includes(user?._id)) {
          console.log("send");
          handleSubmitViewCount(currentStatus?._id);
        }
        return;
      }
      console.log("Video ended back to ");

      // dispatch(getUsers);
      if (location?.state?.from === "/") {
        navigate("/");
      } else if (location?.state?.from === "/allstatus") {
        navigate("/allstatus");
      }
      // console.log('log');
    };
    // console.log('hhhhhh');
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

  // console.log(users);
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
        id: currentStatusUser?._id,
        senderId: user?._id,
        users,
      });
    }
  };

  const handleTouchEnd = (e) => {
    setStartY(null);
  };
  const handleTouchMove = (e) => {
    const eendY = e.touches[0].clientY;
    setEndY(eendY);
    if (
      startY !== null &&
      endY <= (videoRef?.current?.clientHeight * 60) / 100
    ) {
      setEndY(videoRef.current.clientHeight - eendY);
      setShowDiv(true);
    }
  };
  const handleTouchStart = (e) => {
    // const startY = e;
    setStartY(e.touches[0].clientY);
  };
  const handlevideotouch = (e) => {
    const y = e.touches[0].clientX;
    setVideoEndY(y);
  };
  const handleSubmitViewCount = (id) => {
    // console.log({ statusOwner: currentStatusUser?._id, statusId: id });

    console.log(currentStatusUser);
    if (currentStatusUser?._id && id) {

      // if (user?._id===id) {
      //   console.log('same');
      //   return
      // }
      console.log('dispatch VIew ');
      dispatch(
        viewCounter({ statusOwner: currentStatusUser?._id, statusId: id })
      );
    }
  };
  // console.log(count);
  useEffect(() => {
    setCurrentStatus(currentStatusUser?.status[count]);
  }, [count, currentStatusUser, user, users]);
  useEffect(() => {
    dispatch(getUsers);

    if (statusUser?.length > 0) {
      statusUser?.forEach((item, index) => {
        if (item._id === id) {
          if (index !== statusUserIndex) {
            setStatusUSerIndex(index);
            console.log("entered", index);
          }
        }
      });
    }
  }, []);
  // console.log(statusViewUSer);

  const handlebackward = () => {
    console.log("backe=wrd");
  };
  return (
    <Fragment>
      {currentStatusUser &&
      currentStatusUser.status &&
      currentStatusUser.status.length > 0 ? (
        <Fragment>
          <div className="position-absolute w-100 p-2 poiter  d-flex gap-5 mt-4 justify-content-start align-items-center ">
            <i
              onClick={handlebackward}
              className=" text-white fa-solid fa-arrow-left fs-1 "
            ></i>
            <div className="d-flex gap-2 align-items-center ">
              <img
                className="myStatus"
                height={"60px "}
                width={"60px"}
                src={currentStatusUser?.avatar}
                alt=" myStatus"
              />
              <div className="row gap-1">
                <h5 className="fw-bold fs-1 text-white">
                  {currentStatusUser?.name}
                </h5>
                <p className="fw-bolder  fs-5 text-white">
                  {currentStatusUser?.name}
                </p>
              </div>
            </div>
          </div>

          <video
            src={currentStatusUser?.status[count]?.Status}
            className=" w-100 video "
            height={"101%"}
            playsInline
            autoPlay
            ref={videoRef}
            onClick={handlePlayPuase}
            onTouchStart={handlevideotouch}
          ></video>
          {user?._id === id ? (
            <Fragment>
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={container}
                className={`viewCounter w-100 m-0 ${
                  !showDiv ? "position-absolute bottom-0 " : ""
                }   `}
                style={{ height: "60px" }}
              >
                <div
                  className={`inner-div m-0 p-0    ${
                    showDiv ? "" : "closeDiv"
                  }`}
                  style={{ height: `${endY ? endY : "50"}px` }}
                >
                  <i className=" text-white fw-bold fa-regular fa-eye d-flex w-100 p-2 justify-content-center align-items-center ">
                    {currentStatusUser?.status[count]?.viewCount?.length ?? null}
                  </i>

                  {showDiv &&
                    statusViewUSer?.map((item) => (
                      <div key={item?._id} className="p-3 m-0  w-100 d-flex justify-content-between align-items-center">
                        <figure className="figure d-flex justify-content-center align-items-center gap-2">
                          <img
                            className="img myStatus"
                            src={item?.avatar}
                            height={"60px "}
                            width={"60px"}
                            alt="pp"
                            
                          />
                          <h4 className="text-white">{item.name}</h4>
                        </figure>
                        <p className="text-white"> time</p>
                      </div>
                    ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <form className="from-group viewCounter p-0 m-0  w-100  ">
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
