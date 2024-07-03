import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketPrivider = ({ children }) => {
  const [socket, SetSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);
  const [messages, setMessages] = useState(null);
  const { user = {} } = useSelector((state) => state.authState);

  useEffect(() => {
    if (user && user._id) {
      const socketInstatnce = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });
      
      // socketInstatnce.on("newMessage", (message) => {
      //   // console.log(message);
      //   setMessages(message);
      // });
     
      socketInstatnce.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
        console.log(users);
      });
      SetSocket(socketInstatnce);
      
      // Clean up socket on unmount or when user or user._id changes
      return () => socketInstatnce.close();
    } else {
      // Handle case where user or user._id is null or undefined
      if (socket) {
        socket.close();
        SetSocket(null);
      }
      // setOnlineUser([]);
    }
  }, [user,messages]); // Ensure user?._id is included in dependency array
  // console.log('messages',messages);
  return (
    <socketContext.Provider value={{ socket, onlineUsers ,messages}}>
      {children}
    </socketContext.Provider>
  );
};
