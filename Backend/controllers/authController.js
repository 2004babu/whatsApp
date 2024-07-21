const { default: mongoose } = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const UserModel = require("../model/userModel");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("../utils/jwt");
const bcryptjs = require("bcryptjs");
exports.signUp = catchAsyncError(async (req, res, next) => {
  try {
    const { name, password, confirmPassword, email, gender } = req.body;

    let avatar;

    let BASE_URL = process.env.BACKEND_URL;

    if (process.env.NODE_ENV === "Production") {
      BASE_URL = `${req.protocol}://${req.get("host")}`;
    }

    ///check input required
    if (!name || !password || !confirmPassword || !email || !gender) {
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

    if (req.file) {
      avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`;

      userInfo.avatar = avatar;
    }
    const user = await userModel.create(userInfo);

    if (!user) {
      return next(new Error("cont create New User "));
    }
    //  response sed with jwt

    jwt(res, 201, user);
  } catch (error) {
    console.error(error.message);
    console.log("login side Error ");
    next(error);
  }
});
exports.login = catchAsyncError(async (req, res, next) => {
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
    console.log("login side Error ");
    next(error);
  }
  // res.send("login");
});
exports.logout = catchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("login first to handle this ."));
    }

    res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logout Success " });
  } catch (error) {
    console.error(error.message);
    console.log("login side Error ");
    next(error);
  }
});
exports.loaduser = catchAsyncError(async (req, res, next) => {
  try {
    
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("login first to handle this ."));
    }

    jwt(res, 201, user);
  } catch (error) {
    console.error(error.message);
    console.log("login side Error ");
    next(error);
  }
});

exports.getUserList = catchAsyncError(async (req, res, next) => {
  console.log(req.user._id);
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    next(new ErrorHandler("not found Your id ..."));
  }
  res.status(200).json({
    user,
  });
});

exports.setUsersRequest = catchAsyncError(async (req, res, next) => {
  try {
    const loginUserId = req.user._id;
    const requestFor = req.body.id;

    if (!loginUserId || !requestFor) {
      return next(new ErrorHandler("Not get id`s"));
    }

    if (!mongoose.Types.ObjectId.isValid(requestFor)) {
      return next(new ErrorHandler("not Valid Id "));
    }
    let currentUser = await userModel.findById(loginUserId);
    let user = await userModel.findById(requestFor);

    if (!user) {
      return next(new ErrorHandler("user Not Found "));
    }
    // let filtered;

    // currentUser.userRequest=user.userRequest.filter(item=>item.toString()!==loginUserId)

    // user.FriendList.push(loginUserId)
    // currentUser.FriendList.push(requestFor)
    // console.log(!user.userRequest.includes(loginUserId));

    if (!user.userRequest.includes(loginUserId)) {
      user.userRequest.push(loginUserId);
    }
    // console.log(user.userRequest);
    await user.save({ validateBeforeSave: true });
    const users = await userModel.find({ _id: { $ne: loginUserId } }); //with out current user
    res.status(201).json({ user: currentUser, users });
  } catch (error) {
    console.log(error);
  }
});

exports.removeUserRequest = catchAsyncError(async (req, res, next) => {
  try {
    const loginUserId = req.user._id;
    const requestFor = req.params.id;

    if (!loginUserId || !requestFor) {
      return next(new ErrorHandler("Not get id`s"));
    }

    if (!mongoose.Types.ObjectId.isValid(requestFor)) {
      return next(new ErrorHandler("not Valid Id "));
    }

    let currentUser = await userModel.findById(req.user._id); //current user
    let user = await userModel.findById(requestFor);

    if (!user) {
      return next(new ErrorHandler("user Not Found "));
    }
    user.userRequest = user.userRequest.filter(
      (item) => item.toString() !== loginUserId.toString()
    );
    currentUser.userRequest = currentUser.userRequest.filter(
      (item) => item.toString() !== requestFor.toString()
    );
    await user.save({ validateBeforeSave: true });
    await currentUser.save({ validateBeforeSave: true });
    const users = await userModel.find({ _id: { $ne: loginUserId } }); //with out current user
    res.status(201).json({ user: currentUser, users });
  } catch (error) {
    console.log(error);
  }
});

exports.acceptUserRequest = catchAsyncError(async (req, res, next) => {
  try {
    const loginUserId = req.user._id;
    const requestFor = req.params.id;

    // console.log(requestFor);
    if (!loginUserId || !requestFor) {
      return next(new ErrorHandler("Not get id`s"));
    }

    if (!mongoose.Types.ObjectId.isValid(requestFor)) {
      // return next(new ErrorHandler('not Valid Id ',401))
    }

    let currentUser = await userModel.findById(req.user._id);
    let user = await userModel.findById(requestFor);

    if (!user) {
      return next(new ErrorHandler("user Not Found "));
    }
    // let filtered;

    currentUser.userRequest = currentUser.userRequest.filter(
      (item) => item.toString() !== requestFor.toString()
    );
    user.userRequest = user.userRequest.filter(
      (item) => item.toString() !== loginUserId.toString()
    );

    if (!user.FriendList.includes(loginUserId)) {
      user.FriendList.push(loginUserId);
    }

    if (!currentUser.FriendList.includes(requestFor)) {
      currentUser.FriendList.push(requestFor);
    }

    await user.save({ validateBeforeSave: true });
    await currentUser.save({ validateBeforeSave: true });
    const users = await userModel.find({ _id: { $ne: loginUserId } }); //with out current user

    res.status(201).json({ user: currentUser, users });
  } catch (error) {
    console.log(error);
  }
});

exports.removeFriend = catchAsyncError(async (req, res, next) => {
  try {
    const loginUserId = req.user._id;
    const requestFor = req.params.id;

    if (!loginUserId || !requestFor) {
      return next(new ErrorHandler("Not get id`s"));
    }

    if (!mongoose.Types.ObjectId.isValid(requestFor)) {
      return next(new ErrorHandler("not Valid Id "));
    }
    let currentUser = await userModel.findById(req.user._id);
    let user = await userModel.findById(requestFor);

    if (!user) {
      return next(new ErrorHandler("user Not Found "));
    }
    user.FriendList = user.FriendList.filter(
      (item) => item.toString() !== loginUserId.toString()
    );
    currentUser.FriendList = currentUser.FriendList.filter(
      (item) => item.toString() !== requestFor.toString()
    );

    await currentUser.save({ validateBeforeSave: true });
    await user.save({ validateBeforeSave: true });
    const users = await userModel.find({ _id: { $ne: loginUserId } }); //with out current user
    res.status(201).json({ user: currentUser, users });
  } catch (error) {
    console.log(error);
  }
});
