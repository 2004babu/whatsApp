const { Server } = require("socket.io");
const path = require("path");
const dotenv = require("dotenv")
dotenv.config({path:path.join(__dirname,'../config.env')})
const User = require("../model/userModel");

let message;
const getReceiverSocketId = (ReceiverId) => {
  message = ReceiverId;
  return ReceiverId;
};
console.log(process.env.FRONTEND_URL);
const setSocket = (server) => {
  // const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  const io = new Server(server, {
    cors: {
      origin:true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });




  let onlineUsers = {}; //{userId:socket.id}
  let userLineUp = [];
  let users = [];
  io.on("connect", (socket) => {
    // console.log(socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) onlineUsers[userId] = socket.id;
    socket.on("sendMessage", (e) => {
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
      console.log("final", users);

      
      try {
        
        users.forEach(async (item) => {
          io.to(onlineUsers[item.senderId]).emit("userLineUp", item);
          let setUser = await User.findById(item.senderId);
  
          // 1.if exist then remove and add last index
          // 2.if not exist add in last index
  
          item.Receiverids.forEach((value) => {
           
              if(setUser?.lineUpList?.senderId){
                
                if (setUser?.lineUpList?.Receiverids?.includes(value)) {
                  
                  setUser.lineUpList.Receiverids=setUser.lineUpList.Receiverids.filter(ele=>ele!==value)
                  setUser?.lineUpList?.Receiverids?.push(value)
                }else{
                 
                  setUser?.lineUpList?.Receiverids?.push(value)
                }
              }else{
                setUser.lineUpList=item
              }
            
          });
          const newuser= await setUser.save({validateBeforeSave:true})
          
        });
      } catch (error) {
        console.log(error);
        console.log('error from socket io sending userslist');
      }

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
