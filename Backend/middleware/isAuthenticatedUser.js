const UserModel = require('../model/userModel');
const ErrorHandler=require('../utils/ErrorHandler')
const jwt =require('jsonwebtoken')

module.exports=async(req,res,next)=>{
   //  console.log(req.cookies.token);

 const token =req.cookies.token;

 
 if(!token){
    return next(new ErrorHandler('login First to Handle This ... Token NOt Found ',401))
 }
 
 const {id}=jwt.verify(token,process.env.JWT_SECRET);
//  console.log(id);
 
 if(!id){
    return next(new ErrorHandler('invalid Token ... ',404))
 }
 const user=await UserModel.findById(id);
 
//  console.log(user);
 
 if(!user){
    return next(new ErrorHandler('login first  ... ',404))
 }

 req.user=user
    next()
}

