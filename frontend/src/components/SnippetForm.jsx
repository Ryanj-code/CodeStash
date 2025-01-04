import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import Editor from "@monaco-editor/react"; // Using monaco editor for code editor
import "./SnippetForm.css";

const SnippetForm = ({
  initialData,
  onSubmit,
  heading = "",
  submitButtonText = "",
}) => {
  const [snippetData, setSnippetData] = useState(initialData);
  const [tagInput, setTagInput] = useState("");
  const [editorHeight, setEditorHeight] = useState("");
  const [editorWidth, setEditorWidth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setEditorHeight(`${window.innerHeight * 0.45}px`);
      setEditorWidth(`${window.innerWidth * 0.5}px`);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (key, value) => {
    setSnippetData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
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
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(snippetData);
  };

  return (
    <div className="snippet-form-container">
      <h3>{heading}</h3>
      <form onSubmit={handleSubmit}>
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
          <Editor
            width={editorWidth}
            height={editorHeight}
            language={snippetData.language}
            value={snippetData.content}
            onChange={(value) => handleChange("content", value || "")}
            theme="vs-dark"
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
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
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
          <button type="submit">{submitButtonText}</button>
        </div>
      </form>
      <CustomButton label="Back" onClick={() => navigate("/library")} />
    </div>
  );
};

export default SnippetForm;
