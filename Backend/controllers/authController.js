const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("../utils/jwt");
const bcryptjs = require("bcryptjs");
exports.signUp =catchAsyncError( async (req, res, next) => {
  try {
    const { name, password, confirmPassword, email, gender } = req.body;
    
    
    let avatar;

    let BASE_URL=process.env.BACKEND_URL;

    if(process.env.NODE_ENV==='Production'){
      BASE_URL=`${req.protocol}://${req.get('host')}`
    }

    ///check input required
    if (!name || !password || !confirmPassword|| !email || !gender) {
      return next(new Error("fill value "));
    }
    
    if (password !== confirmPassword) {
      return next(new Error("Password Does NOt Match ...!"));
    }
    
    ///default profile
    
    //creaet  new user
    const userInfo = {
      name,
      password,
      email,
      gender,
    };
    
    //handle Avatar
    
    if(req.file){
       avatar=`${BASE_URL}/uploads/users/${req.file.originalname}`
     
      userInfo.avatar=avatar
    }
    const user = await userModel.create(userInfo);

    if (!user) {
      return next(new Error("cont create New User "));
    }
    //  response sed with jwt

    jwt(res, 201, user);
  } catch (error) {
    console.error(error.message);
    console.log('login side Error ');
    next(error);
  }
}
)
exports.login =catchAsyncError (async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Fill The Values "));
    }

    const user = await userModel.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
      return next(new ErrorHandler("User Not Found .... Email is Wrong "));
    }

    const isValidPassword = await bcryptjs.compare(
      password.toString(),
      user.password
    );
    // console.log(isValidPassword);

    if (!isValidPassword) {
      return next(new ErrorHandler("password does not Match ...."));
    }

    jwt(res, 201, user);
  } catch (error) {

    console.error(error.message);
    console.log('login side Error ');
    next(error);

  }
  // res.send("login");
});
exports.logout = catchAsyncError( async (req, res, next) => {
  try {
    const user=req.user;
    if(!user){
      return next(new ErrorHandler('login first to handle this .'))
    }

    res.status(200).cookie('userToken','',{maxAge:0}).json({message:"logout Success "})
  } catch (error) {
    
    console.error(error.message);
    console.log('login side Error ');
    next(error);
  }
});
exports.loaduser = catchAsyncError( async (req, res, next) => {
  try {
    const user=req.user;
    if(!user){
      return next(new ErrorHandler('login first to handle this .'))
    }

    jwt(res,201,user)
  } catch (error) {
    
    console.error(error.message);
    console.log('login side Error ');
    next(error);
  }
});
