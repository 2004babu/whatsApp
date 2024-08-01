
const {
    signUp,
    login,
    logout,
    loaduser,
    getUserList,
    setUsersRequest,
    removeUserRequest,
    acceptUserRequest,
    removeFriend,
    
  } = require('../controllers/authController');
  const isAuthenticatedUser = require('../middleware/isAuthenticatedUser.js');
  const express = require('express');
  const route = express.Router();
  const path = require('path');
  const multer = require('multer');
const { viewCount,setStatus, deleteStatus } = require('../controllers/statusController.js');
const url =require('url')


  
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

    if (file.mimetype.startsWith('video/')) {
      const uri=encodeURIComponent(file.originalname)

      const parsedUrl = url.parse(uri);
      // console.log(parsedUrl,"parsedUrl");
const decodedFileName = decodeURIComponent(path.basename(parsedUrl.pathname));

      cb(null, decodedFileName);
    }else{
      cd (null ,file.originalname)
    }
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

  //addusers requests ,accepts,rejects
  route.post('/adduser', isAuthenticatedUser, setUsersRequest);
  route.delete('/adduser/:id', isAuthenticatedUser, removeUserRequest);
  route.post('/acceptuser/:id', isAuthenticatedUser, acceptUserRequest);
  route.delete('/removefriend/:id', isAuthenticatedUser, removeFriend);
  ///status

  route.post('/status', isAuthenticatedUser, uploads.single('status'), setStatus);
route.post('/status/count',isAuthenticatedUser,viewCount)
route.delete('/status/:statusId',isAuthenticatedUser,deleteStatus)
  
  module.exports = route;
  