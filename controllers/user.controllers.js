const { signupService, loginService } = require("../services/user.services");
const { generateToken } = require("../utils/generateToken");

module.exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    res.status(200).json({
      status: true,
      message: "signup successfull",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "signup failed",
      error,
    });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: false,
        message: "Please Provide Right Credential",
      });
    }
    const user = await loginService(email);
    if (!user) {
      return res.status(403).json({
        status: false,
        message: "Please Create An Account First",
      });
    }
    if (email !== user?.email) {
      return res.status(403).json({
        status: false,
        message: "Please Provide Correct Email",
      });
    }
    const isValidPassword = await user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: false,
        message: "Please Provide Right Password",
      });
    }
    const token = generateToken(user);
    return res.status(403).json({
      status: true,
      message: "Login Successfull",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "login failed",
      error,
    });
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await loginService(req.decoded.email);
    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "give the token",
      error,
    });
  }
};
