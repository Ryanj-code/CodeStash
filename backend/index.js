const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Config for DB connection

// Import routes
const authRoutes = require("./routes/authRoutes");
const snippetRoutes = require("./routes/snippetRoutes");
const libraryRoutes = require("./routes/libraryRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

connectDB();

app.use("", authRoutes); // Authentication routes (signup, login, etc.)
app.use("", snippetRoutes); // Snippet-related routes
app.use("", libraryRoutes); // Library-related routes (for snippets)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
