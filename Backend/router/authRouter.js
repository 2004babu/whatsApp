const {signUp, login, logout, loaduser} =require('../controllers/authController')
const isAuthenticatedUser =require('../middleware/isAuthenticatedUser.js')
const express =require('express')
const route=express.Router()
const path=require('path')

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,'../uploads/users'))
    },
    filename:function (req,file,cb){
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,file.originalname);
    }
})

const uploads=multer({storage:storage})

route.post('/signup',uploads.single('avatar'),signUp)
route.post('/login',login)
route.delete('/logout',isAuthenticatedUser,logout)
route.get('/loaduser',isAuthenticatedUser,loaduser)
 module.exports =route