const { Server } = require("socket.io");
const path = require("path");
const lodash = require("lodash");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../config.env") });
const User = require("../model/userModel");

let message;
const getReceiverSocketId = (ReceiverId) => {
  message = ReceiverId;
  return ReceiverId;
};

const setSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  let users = [];
  let onlineUsers = {}; // {userId: socket.id}

  // console.log(onlineUsers);
  io.on("connect", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) onlineUsers[userId] = socket.id;
    const handleSendMessage = lodash.throttle(async (e) => {
      let userlist = {
        senderId: null,
        Receiverids: [],
      };
      const isAlive = users.filter((item) => item.senderId === e.senderId);

      if (isAlive.length > 0) {
        users.forEach((item) => {
          if (item.senderId === e.senderId) {
            if (item.Receiverids.includes(e.id)) {
              item.Receiverids = item.Receiverids.filter(
                (value) => value !== e.id
              );
              item.Receiverids.push(e.id);
            } else {
              item.Receiverids.push(e.id);
            }
          }
        });
      } else {
        userlist.senderId = e.senderId;
        userlist.Receiverids = [];
        userlist.Receiverids.push(e.id);
        users.push(userlist);
      }

      try {
        for (const item of users) {
          io.to(onlineUsers[item.senderId]).emit("userLineUp", item);

          let setUser = await User.findById(item.senderId);
          item.Receiverids.forEach((value) => {
            if (setUser?.lineUpList?.senderId) {
              if (setUser?.lineUpList?.Receiverids?.includes(value)) {
                setUser.lineUpList.Receiverids =
                  setUser.lineUpList.Receiverids.filter((ele) => ele !== value);
                setUser.lineUpList.Receiverids.push(value);
              } else {
                setUser.lineUpList.Receiverids.push(value);
              }
            } else {
              setUser.lineUpList = item;
            }
          });
          await setUser.save({ validateBeforeSave: true });
        }
      } catch (error) {
        console.error("Error from socket.io sending user list:", error);
      }

      console.log(
        "e.id, onlineUsers[e.id],",
        e.id,
        onlineUsers,
        socket.id,
        "onlineUsers[e.id]"
      );
      const senderId = onlineUsers[e.id];
      console.log(senderId);
      socket.to(senderId).emit("newMessage", e);
    }, 1000); // Consider increasing throttle duration if needed

    socket.on("sendMessage", handleSendMessage);
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    socket.on("uploadStatus", (user) => {
     
     

      user?.FriendList?.forEach((item) => {
        console.log("item",item);
        if (onlineUsers[item]) {
          console.log(onlineUsers);
          io.to(onlineUsers[item]).emit("Status", onlineUsers[user._id]);
        }
      });
    });
    socket.on('userRequest',(e)=>{
  
      if (onlineUsers[e]) {
        console.log(onlineUsers[e]);
        socket.to(onlineUsers[e]).emit('request','onlineUsers[e]')
      }
    })
    socket.on("disconnect", () => {
      delete onlineUsers[userId];
      io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
  });
};

module.exports = { getReceiverSocketId, setSocket };
