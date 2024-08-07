const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "other"],
      default: "other",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    avatar: {
      type: String,
    },
    lineUpList: {
      senderId: { type: String },
      Receiverids: {
        type: Array,
        default: [],
      },
    },
    status: [
      {
        message: String,
        Status: String,
        viewCount: { type: Array, default: [] },
        createAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    userRequest: {
      type: Array,
      default: [],
    },
    FriendList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (enteredpassword) {
  return await bcryptjs.compare(enteredpassword, this.password);
};

userSchema.methods.getJWTToken = async function (next) {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
