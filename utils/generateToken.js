const jsonwebtoken = require("jsonwebtoken");
module.exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo?.email,
    role: userInfo?.role,
    status: userInfo?.status,
  };
  const token = jsonwebtoken.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  return token;
};
