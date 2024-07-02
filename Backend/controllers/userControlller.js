const { default: mongoose } = require("mongoose");
const UserModel = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.getAllUsers = catchAsyncError( async (req, res, next) => {
  try {
    const isLoggedInUser = req.user._id.toString();
    // console.log(isLoggedInUser);
    if (!isLoggedInUser || !mongoose.isValidObjectId(isLoggedInUser)) {
      return next(new ErrorHandler("not Found", 401));
    }

    const allUsers = await UserModel.find({ _id: { $ne: isLoggedInUser } });
    if (!allUsers) {
      return next(new ErrorHandler("not Found", 401));
    }

    // console.log(allUsers);

    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log("error in get all users ", error.message);
    next(error);
  }
});
