const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const validator = require("mongoose-unique-validator");
// const { isEmail } = require("validator");

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
      enum: ["Male", "Female"],
      default:'other'
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
    status: {
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

// Plugin to enforce unique validation
// userSchema.plugin(validator, {
//   message: "Error, expected {PATH} to be unique. {VALUE} already exists",
// });

userSchema.methods.getJWTToken = async function (next) {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
