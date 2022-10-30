const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Provide An Email"],
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      messge: "Please Provide An Valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],

    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "{VALUE} Does Not Strong Enough",
    },
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password Does Not Match",
    },
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    // validate: [validator.isURL, "File is not valid"],
  },
  contact: {
    type: String,
    validate: [validator.isMobilePhone, "Number is not valid"],
  },
  address: String,
  role: {
    type: String,
    enum: {
      values: ["buyer", "manager", "admin"],
      message: "{VALUE} does not acceptable",
    },
    default: "buyer",
  },
  status: {
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "{VALUE} does not acceptable",
    },
    default: "active",
  },
});

userSchema.pre("save", async function (next) {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password, hashPassword) {
  const isValidPassword = await bcrypt.compare(password, hashPassword);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
