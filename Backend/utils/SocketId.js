
const onlineUsers={}  //{userId:socket.id}

const getReceiverSocketId=(ReceiverId)=>{
    console.log(ReceiverId);
    return ReceiverId;
}

module.exports={getReceiverSocketId,onlineUsers}