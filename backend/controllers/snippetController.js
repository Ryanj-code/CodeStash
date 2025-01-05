const User = require("../models/User");
const Library = require("../models/Library");
const Snippet = require("../models/Snippet");

const addSnippet = async (req, res) => {
  try {
    const { snippetData, userID } = req.body;
    const { title, content, language, tags, notes } = snippetData;

    if (!title || !content || !language || !userID) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const snippetDoc = await Snippet.create({
      title,
      content,
      language,
      tags,
      notes: notes || "",
      createdAt: Date.now(),
    });

    let userLibrary = await Library.findOne({ userId: userID });
    userLibrary.snippets.push(snippetDoc._id);
    await userLibrary.save();

    res.status(201).json({
      message: "Snippet created and added to user library",
      snippet: snippetDoc,
    });
  } catch (err) {
    console.error("Error creating snippet:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editSnippet = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const { title, content, language, tags, notes } = req.body;

    const updatedSnippetDoc = {
      title,
      content,
      language,
      tags,
      notes,
      createdAt: Date.now(),
    };

    // console.log(updatedSnippetDoc);
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      snippetId,
      updatedSnippetDoc,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedSnippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.json(updatedSnippet);
  } catch (err) {
    console.error("Error updating snippet:", err);
    res.status(500).json({ message: "Server error" }); // Send error response if something goes wrong
  }
};

const getSnippet = async (req, res) => {
  try {
    const { snippetId } = req.params;
    // console.log("Received snippetId:", snippetId); // Check for snippetId in the console
    const snippetDoc = await Snippet.findById(snippetId);
    res.json(snippetDoc);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const { snippetId } = req.params;
    const { userID } = req.body;

    // Find and delete the snippet by its ID
    const deletedSnippet = await Snippet.findByIdAndDelete(snippetId);
    if (!deletedSnippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Find the user's library
    const userLibrary = await Library.findOne({ userId: userID });
    console.log(userLibrary);
    if (!userLibrary) {
      return res.status(404).json({ message: "User library not found" });
    }

    // Remove the snippet from the user's library
    userLibrary.snippets = userLibrary.snippets.filter(
      (snippet) => snippet._id.toString() !== snippetId
    );
    await userLibrary.save(); // Save the updated library document

    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
};

module.exports = { addSnippet, editSnippet, getSnippet, deleteSnippet };
