const router = require("express").Router();
const userControllers = require("../../controllers/user.controllers");
const { authoriziedUser } = require("../../middlewares/athorizedUser");
const { verifyToken } = require("../../middlewares/verifyToken");

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.get(
  "/getme",
  verifyToken,
  authoriziedUser("admin", "manager"),
  userControllers.getMe
);

module.exports = router;
