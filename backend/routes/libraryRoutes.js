const express = require("express");
const router = express.Router();
const { getLibrary } = require("../controllers/libraryController");

router.get("/get-library/:userId", getLibrary);

module.exports = router;
