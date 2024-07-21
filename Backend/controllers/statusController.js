const catchAsyncError = require("../middleware/catchAsyncError");
const UserModel = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.setStatus = catchAsyncError(async (req, res, next) => {
  let status;
  const { uploadEmoji } = req.body;

  let BASE_URL = `${process.env.BACKEND_URL}`;

  if (process.env.NODE_ENV === "Prodection") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (!req.file) {
    next(new ErrorHandler("not found your file"), 301);
  }

  status = `${BASE_URL}/uploads/videos/${req.file.originalname}`;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    next(new ErrorHandler("user Not found "), 401);
  }
  user.status.push({ message: uploadEmoji, Status: status });
  await user.save({ validateBeforeSave: true });

  res.status(201).json({ user });
});

exports.viewCount = catchAsyncError(async (req, res, next) => {
  const viewUser = req.user._id;
  const { statusOwner } = req.body;
  if (!statusOwner && !viewUser) {
    res.status(401).json({ messgae: "Some Problem Found  " });
  }

  const user = await UserModel.findById(statusOwner);
  if (!user) {
    res.status(401).json({ messgae: "not Found Your Id " });
  }
  if (!user.status[0].viewCount.includes(viewUser)) {
    user.status[0].viewCount.push(viewUser);
  }
  // console.log(user.status);
  await user.save({ validateBeforeSave: true });

  res.status(201).json({message:"success to update status count "});
});


exports. deleteStatus=catchAsyncError(async(req,res,next)=>{
  const userId=req.user._id
  const {statusId}=req.params;

  const user = await UserModel.findById(
    userId
  );

  if (!user) {
    return next(new ErrorHandler('NOt FOund Your ID  ',404))
  }
  user.status=user.status.filter(item=>{
   
    item._id !== statusId})


  user.save({validateBeforeSave:true})

  res.status(200).json({user})
  })