import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AddSnippet.css";

const AddSnippet = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("Python");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="add-snippet-container">
        <h1>Add New Snippet</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Snippet Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated):</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Snippet Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Add Snippet</button>
        </form>
      </div>
    </div>
  );
};

export default AddSnippet;
