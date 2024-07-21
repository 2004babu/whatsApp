const express =require('express')
const isAuthenticatedUser=require('../middleware/isAuthenticatedUser')
const { getAllUsers } = require('../controllers/userControlller')
const route=express.Router()

route.get('/',isAuthenticatedUser,getAllUsers)


module.exports=route