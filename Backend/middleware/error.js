const ErrorHandler = require("../utils/ErrorHandler");

module.exports=async(err,req,res,next)=>{
    // console.log('from error Handler  '+err.code);
    console.log('from error Handler',err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    if (err.code) {
        switch (err.code) {
          case 11000:
            err = new ErrorHandler("Duplicate key error: Email already exists", 400);
            break;
          case 121:
            err = new ErrorHandler("Document validation failed", 400);
            break;
          case 2:
            err = new ErrorHandler("Document too large", 413);
            break;
          case 112:
            err = new ErrorHandler("Write conflict, please retry", 409);
            break;
          case 13:
            err = new ErrorHandler("Unauthorized access", 401);
            break;
          default:
            err = new ErrorHandler("An unknown error occurred", 500);
            break;
        }
      }
    
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='Production'?null:err.stack
    })
}