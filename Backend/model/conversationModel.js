const mongoose=require('mongoose')

const conversationSChema=mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[]
        }
    ],
},{timestamps:true})

const conversationModel=mongoose.model('Conversation',conversationSChema)

module.exports=conversationModel