const express = require("express");
const {
  addSnippet,
  editSnippet,
  getSnippet,
  deleteSnippet,
} = require("../controllers/snippetController");

const router = express.Router();

router.post("/add-snippet", addSnippet);
router.post("/edit-snippet/:snippetId", editSnippet);
router.get("/get-snippet/:snippetId", getSnippet);
router.delete("/delete-snippet/:snippetId", deleteSnippet);

module.exports = router;
