const mongoose =require('mongoose')

const messageShema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        
    },
    ReceiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})


const messageModel=mongoose.model('Message',messageShema)

module.exports=messageModel;