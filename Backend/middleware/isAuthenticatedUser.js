const UserModel = require('../model/userModel');
const ErrorHandler=require('../utils/ErrorHandler')
const jwt =require('jsonwebtoken')

module.exports=async(req,res,next)=>{
   //  console.log(req);

 const token =req.cookies.token;

 
 if(!token){
   
 return  res.status(401).json({
      message:'Login First to Handle This'
   }) 

}
  

 const {id}=jwt.verify(token,process.env.JWT_SECRET);
//  console.log(id);
//  console.log(token);
 
 if(!id){
    return next(new ErrorHandler('invalid Token ... ',404))
 }
 const user=await UserModel.findById(id);
 
//  console.log(user);
 
 if(!user){
   //  return next(new ErrorHandler('login first  ... ',404))
   res.status(401).json({
      message:'Login First to Handle This'
   })
   return
 }else{

    req.user=user
       next()
 }


}

