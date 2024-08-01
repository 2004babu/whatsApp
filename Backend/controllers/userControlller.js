const { default: mongoose } = require("mongoose");
const UserModel = require("../model/userModel");
const conversationModel = require("../model/conversationModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.getAllUsers = catchAsyncError( async (req, res, next) => {
  try {
    const isLoggedInUser = req.user._id.toString();
    // console.log("isLoggedInUser",isLoggedInUser);
    if (!isLoggedInUser || !mongoose.isValidObjectId(isLoggedInUser)) {
      return next(new ErrorHandler("not Found", 401));
    }

    let allUsers = await UserModel.find({ _id: { $ne: isLoggedInUser } });
    if (!allUsers?.length>0) {
      return next(new ErrorHandler("No users Here", 401));
    }
    
    
    let items
    
    items=await Promise.all(allUsers.map( async (item,index)=>{
      let conversations=await conversationModel.findOne({participants:{$eq: item._id}}).populate('messages')
 
  if (conversations?._id && conversations?.messages?.length>0) {


    item=item.toObject()
    item.conversations=conversations
  }
  return item
}))
    res.status(200).json({ users: items });
  } catch (error) {
    console.log("error in get all users ", error.message);
    next(error);
  }
});
