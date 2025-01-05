const User = require("../models/User");
const Library = require("../models/Library");
const Snippet = require("../models/Snippet");

const getLibrary = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from the URL parameter
    const userLibrary = await Library.findOne({ userId }).populate("snippets");
    // Finds library associated with userId and populates snippets with the snippets from the library
    if (!userLibrary) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.json({ snippets: userLibrary.snippets }); // Send the user's snippets
  } catch (err) {
    console.error("Error fetching library:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getLibrary };
