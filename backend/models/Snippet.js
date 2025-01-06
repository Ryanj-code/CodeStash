const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true, // The actual code or snippet content
  },
  language: {
    type: String, // Language of the code (e.g., "JavaScript", "Python")
    required: true,
  },
  tags: {
    type: [String], // Array of tags (e.g., ["JavaScript", "React", "Array"])
    default: [], // Default empty array if no tags are provided
  },
  notes: {
    type: String, // Optional notes field for extra info
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation time
  },
});

const Snippet = mongoose.model("Snippet", SnippetSchema);
module.exports = Snippet;
