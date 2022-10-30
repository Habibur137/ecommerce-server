module.exports.authoriziedUser = (...role) => {
  return (req, res, next) => {
    const userRole = req.decoded.role;
    if (!role.includes(userRole)) {
      return res.status(401).json({
        status: false,
        message: "you don't have access",
      });
    }
    next();
  };
};
