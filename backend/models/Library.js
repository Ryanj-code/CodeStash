const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  snippets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet", // Reference to the Snippet model
    },
  ],
});

const Library = mongoose.model("Library", LibrarySchema);
module.exports = Library;
