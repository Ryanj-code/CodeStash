const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  profile,
  logout,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);

module.exports = router;
