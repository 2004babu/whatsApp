module.exports = async (res, statusCode, user) => {
  try {
    const token = await user.getJWTToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.COKKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      message: "register success",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
