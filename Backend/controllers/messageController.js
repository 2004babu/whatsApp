const catchAsyncError = require("../middleware/catchAsyncError.js");
const conversationModel = require("../model/conversationModel");
const messageModel = require("../model/messageModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { getReceiverSocketId } = require("../Socket/socket.js");



exports.sendMessage =catchAsyncError( async (req, res, next) => {
  try {
    const ReceiverId = req.params.id;
    const senderId = req.user._id;
    const { message } = req.body;

    if (!senderId || !ReceiverId || !message) {
      return next(new ErrorHandler("some Error in send Data...."));
    }

    const newMessage = await messageModel.create({
      ReceiverId,
      senderId,
      message,
    });

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, ReceiverId] },
    });

    if (!conversation) {
      conversation =await conversationModel.create({
        participants: [senderId, ReceiverId],
      });
    }


    // console.log(newMessage);
    if (!newMessage) {
      return next(new ErrorHandler("not create Message Data"));
    } else {
      conversation.messages.push(newMessage._id);
    }

    //  await conversation.save()
    //  await newMessage.save()
    

    await Promise.all([await conversation.save(), await newMessage.save()]);

    conversation=await conversationModel.findById(conversation._id).populate('messages')
    getReceiverSocketId({ReceiverId,
      messages:newMessage})
   
    res.status(200).json({
      conversations:conversation,
      messages:newMessage,
    });
  } catch (error) {
    console.log("error in send message in messageController ", error.message);
    next(error);
  }
});

exports.getMessages = catchAsyncError( async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user || !id) {
      return next(new ErrorHandler("got Something Wrong...."));
    }

    const thatconversation = await conversationModel.findOne({
      participants: { $all: [user._id, id] },
    }).populate('messages');

    // console.log(thatconversation);
    if (!thatconversation) {
      return next(new ErrorHandler("not Found Your Conversations...."));
    }

    res.status(200).json({
      conversations: thatconversation,
    });
  } catch (error) {
    console.log("Error in Get Message in Conversataion.....", error.message);
    next(error);
  }
});
exports.getSingleMessage = catchAsyncError( async (req, res, nxet) => {
  try {
    const user = req.user;
    const { id } = req.body;
    // console.log(id);

    if (!user || !id) {
      return next(new ErrorHandler("got Something Wrong...."));
    }

    const message = await messageModel.findOne({
    id
    });
// console.log(message);
    if (!message) {
      return next(new ErrorHandler("not Found Your message...."));
    }

    // res.status(200).json({
    //   message
    // });
  } catch (error) {
    console.log("Error in Get Message in message.....", error.message);
    next(error);
  }
});
