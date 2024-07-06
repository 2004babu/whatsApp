// const {signUp, login, logout, loaduser, getUserList, setStatus} =require('../controllers/authController')
// const isAuthenticatedUser =require('../middleware/isAuthenticatedUser.js')
// const express =require('express')
// const route=express.Router()
// const path=require('path')

// const multer=require('multer')

// const storage=multer.diskStorage({
   
//    destination:function(req,file,cb){

//     if (file.mimetype.startsWith('image/')) {
//         cb(null,path.join(__dirname,'uploads/users'))
//     }else if(file.mimetype.startsWith('video/')){
//         cb(null,path.join(__dirname,'uploads/status'))
//     }else{
//         cb(new Error('not a video or Image ....'),false)

//     }
//    },
//    filename:function(req,file,cb){
//     cb(null,file.originalname)
//    }


// })
// const fileFilter=(req,file,cb)=>{
//     if (file.mimetype.startsWith('Image/')||file.mimetype.startsWith('video/')) {
//         cb(null,true)
//     }else{
//         cb(new Error('not a video or Image ....'),false)
        
//     }
// }


// const uploads=multer({storage:storage,fileFilter})



// route.post('/signup',uploads.single('avatar'),signUp)
// route.post('/login',login)
// route.delete('/logout',isAuthenticatedUser,logout)
// route.get('/loaduser',isAuthenticatedUser,loaduser)
// route.get('/Receiverlist',isAuthenticatedUser,getUserList)
// route.post('/status', isAuthenticatedUser, uploads.single('file'), setStatus);
//  module.exports =route

const {
    signUp,
    login,
    logout,
    loaduser,
    getUserList,
    setStatus,
  } = require('../controllers/authController');
  const isAuthenticatedUser = require('../middleware/isAuthenticatedUser.js');
  const express = require('express');
  const route = express.Router();
  const path = require('path');
  const multer = require('multer');
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
        cb(null, path.join(__dirname, '../uploads/users')); // Corrected directory path
      } else if (file.mimetype.startsWith('video/')) {
        cb(null, path.join(__dirname, '../uploads/videos')); // Corrected directory path
      } else {
        cb(new Error('Not a video or image'), false);
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not a video or image'), false);
    }
  };
  
  const uploads = multer({ storage: storage, fileFilter: fileFilter });
  
  route.post('/signup', uploads.single('avatar'), signUp);
  route.post('/login', login);
  route.delete('/logout', isAuthenticatedUser, logout);
  route.get('/loaduser', isAuthenticatedUser, loaduser);
  route.get('/Receiverlist', isAuthenticatedUser, getUserList);
  route.post('/status', isAuthenticatedUser, uploads.single('status'), setStatus);
  
  module.exports = route;
  