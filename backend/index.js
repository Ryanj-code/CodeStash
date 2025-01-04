const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Library = require("./models/Library.js");
const Snippet = require("./models/Snippet.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookierParser = require("cookie-parser");

require("dotenv").config();
//const crypto = require("crypto");
//const cryptoSecret = crypto.randomBytes(64).toString("hex"); // 64 bytes = 128 hex characters
//console.log(secret);
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(express.json());
app.use(cookierParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

mongoose.connect(process.env.MONGO_URL);

app.post("/signup", async (req, res) => {
  console.log("Signing up.");
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    const newLibrary = new Library({
      userId: userDoc._id, // Link the library to the new user
      snippets: [], // Initialize the snippets array as empty
    });

    await newLibrary.save(); // Save the new library to the database

    jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
      },
      jwtSecret, // secret key for jwt
      {
        /*expiresIn: "12h"*/
      }, // Token expires in 12 hour, options can be empty
      (err, token) => {
        // callback function
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true, // ensures the cookie is not accessible via JavaScript, enhancing security
            secure: true, // ensures the cookie is sent over HTTPS only (Use secure in production or can turn off secure when developing)
            sameSite: "None", // helps prevent CSRF attacks by ensuring the cookie is sent only in a first-party context
          })
          .status(201)
          .json(userDoc);
      }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(422).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  console.log("Logging in.");
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        console.log("Login successful.");
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          }, // user's email and user's id from db
          jwtSecret,
          {
            /*expiresIn: "12h"*/
          }, // Token expires in 12 hour, options can be empty
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
              })
              .json(userDoc);
          }
        );
      } else {
        res.status(422).json("Password is not correct");
      }
    } else {
      res.json("User not found");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(422).json({ error: err.message });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json(null);
  }

  try {
    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, email, _id: id } = user;
    res.json({ name, email, id });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      // This should match your signup/login cookie settings
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0), // Set expiry to the past to remove the cookie
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});

app.get("/getlibrary/:userId", async (req, res) => {
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
});

app.post("/addsnippet", async (req, res) => {
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

    // console.log(userLibrary);

    res.status(201).json({
      message: "Snippet created and added to user library",
      snippet: snippetDoc,
    });
  } catch (err) {
    console.error("Error creating snippet:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/editsnippet/:snippetId", async (req, res) => {
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
    // Update the snippet in the database
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
});

app.get("/getsnippet/:snippetId", async (req, res) => {
  try {
    const { snippetId } = req.params;
    // console.log("Received snippetId:", snippetId); // Check for snippetId in the console
    const snippetDoc = await Snippet.findById(snippetId);
    res.json(snippetDoc);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
});

app.delete("/deleteSnippet/:snippetId", async (req, res) => {
  try {
    const { snippetId } = req.params;

    // Find and delete the snippet by its ID
    const deletedSnippet = await Snippet.findByIdAndDelete(snippetId);
    if (!deletedSnippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Server error" }); // Send an error response
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
