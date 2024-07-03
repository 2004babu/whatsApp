const { Server } = require("socket.io");

let message;
const getReceiverSocketId = (ReceiverId) => {
  // console.log(ReceiverId);
  message = ReceiverId;
  return ReceiverId;
};

// console.log(message);
const setSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://13.210.245.134:4001",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  let onlineUsers = {}; //{userId:socket.id}

  io.on("connect", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) onlineUsers[userId] = socket.id;
    //
    socket.on("sendMessage", (e) => {
      socket.to(onlineUsers[e.id]).emit("newMessage", e);
    });
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    socket.on("disconnect", () => {
      delete onlineUsers[userId];
      io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
  });
};

module.exports = { getReceiverSocketId, setSocket };
