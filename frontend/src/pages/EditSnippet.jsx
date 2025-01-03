import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react"; // Using monaco editor for code editor
import axios from "axios";
import Navbar from "../components/Navbar";
import "./EditSnippet.css";

const EditSnippet = () => {
  const { snippetid } = useParams(); // Get the snippet ID from the URL
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [snippetData, setSnippetData] = useState({
    title: "",
    content: "",
    language: "python",
    tags: [],
    notes: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [editorHeight, setEditorHeight] = useState("");
  const [editorWidth, setEditorWidth] = useState("");

  // Fetch snippet data when the component mounts
  useEffect(() => {
    const fetchSnippet = async () => {
      // console.log("Snippet id:", snippetid);
      try {
        const res = await axios.get(`/getsnippet/${snippetid}`); // Fetch snippet by ID
        setSnippetData(res.data); // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching snippet:", err);
      }
    };
    fetchSnippet();
  }, [snippetid]); // Re-fetch if the snippet ID changes

  useEffect(() => {
    const handleResize = () => {
      setEditorHeight(`${window.innerHeight * 0.45}px`);
      setEditorWidth(`${window.innerWidth * 0.5}px`);
    };
    window.addEventListener("resize", handleResize);
    // Initial resize call
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (key, value) => {
    // console.log(`Updating ${key} with value:`, value);

    setSnippetData({
      ...snippetData, // Spread the current state
      [key]: value, // Update only the modified field
    });
  };

  const handleTagInput = (ev) => {
    // Allow the user to add tag by pressing enter or typing a comma
    if (ev.key === "Enter" || ev.key === ",") {
      ev.preventDefault(); // Prevent form submit on enter
      if (tagInput.trim() && !snippetData.tags.includes(tagInput.trim())) {
        setSnippetData((prevData) => ({
          ...prevData,
          tags: [...prevData.tags, tagInput.trim()],
        })); // Holds previous tags in prevTags and appends new one
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSnippetData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
    // Removes only the tag that was clicked
  };

  const handleEditSnippet = async (ev) => {
    ev.preventDefault();

    try {
      //console.log(data);
      const res = await axios.post(`/editsnippet/${snippetid}`, snippetData);
      console.log("Snippet edited successfully:", res.data);
      navigate("/library");
    } catch (err) {
      console.error("Error editing snippet:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-snippet-container">
        <h3>Create Snippet</h3>
        <form onSubmit={handleEditSnippet}>
          <div className="form-row">
            <div className="snippet-title-container form-group">
              <label htmlFor="title">Snippet Title:</label>
              <input
                type="text"
                id="title"
                value={snippetData.title}
                placeholder="Enter Title"
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div className="language-container form-group">
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={snippetData.language}
                onChange={(e) => handleChange("language", e.target.value)}
              >
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="go">Go</option>
                <option value="sql">SQL</option>
                <option value="php">PHP</option>
                <option value="rust">Rust</option>
              </select>
            </div>
          </div>

          <div className="code-area-container form-group">
            <label htmlFor="content">Code:</label>
            {/* Monaco Editor */}
            <Editor
              width={editorWidth} // Same height as your textarea
              height={editorHeight}
              language={snippetData.language} // Dynamically set language
              value={snippetData.content}
              onChange={(value) => handleChange("content", value || "")} // Correct onChange prop
              theme="vs-dark" // Optional: Dark theme
            />
          </div>

          <div className="form-row">
            <div className="tag-container form-group">
              <label htmlFor="tags">Tags:</label>
              <div className="tag-container-2">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)} // Update the tagInput directly here
                  onKeyDown={handleTagInput} // Call handleTagInput for key events (Enter or comma)
                  placeholder="Enter tags"
                />
                <div className="tags-display">
                  {snippetData.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="remove-tag"
                      >
                        O
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="notes-container form-group">
              <label htmlFor="notes">Notes:</label>
              <input
                type="text"
                id="notes"
                value={snippetData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Enter notes"
              />
            </div>
          </div>

          <div className="submit-button">
            <button type="submit">Save Snippet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSnippet;
