const jsonwebtoken = require("jsonwebtoken");
module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login first",
      });
    }

    jsonwebtoken.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Invalid Token",
        });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Invalid Token",
      error,
    });
  }
};
