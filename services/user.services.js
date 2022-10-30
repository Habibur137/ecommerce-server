const User = require("../models/User");

module.exports.signupService = async (userInfo) => {
  const user = new User(userInfo);
  const newUser = await user.save();
  return newUser;
};
module.exports.loginService = async (userEmail) => {
  const user = await User.findOne({ userEmail });
  return user;
};
