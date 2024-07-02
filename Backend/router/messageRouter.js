const express =require('express')
const { sendMessage, getMessages, getSingleMessage } = require('../controllers/messageController')
const isAuthenticatedUser=require('../middleware/isAuthenticatedUser')
const route=express.Router()

route.post('/send/:id',isAuthenticatedUser,sendMessage)

route.post('/:id',isAuthenticatedUser,getMessages)
route.get('/get/:id',isAuthenticatedUser,getSingleMessage)
module.exports=route;


