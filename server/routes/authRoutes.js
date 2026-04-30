const express = require("express");
const { signupUser, loginUser,authVerify} =  require("../controllers/authController");
const { authVerifyMiddleware } = require("../middlewares/auth");

const router = express.Router();

// signup
router.post("/signup", signupUser);

// login
router.post("/login", loginUser);


router.get("/auth-verify", authVerifyMiddleware, authVerify);

module.exports = router;
