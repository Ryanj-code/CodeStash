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

app.get("/library/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userLibrary = await Library.findOne({ userId }).populate("snippets"); // Populate snippets for the user
    if (!userLibrary) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.json({ snippets: userLibrary.snippets }); // Send the user's snippets
  } catch (err) {
    console.error("Error fetching library:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
