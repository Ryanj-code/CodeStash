import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import Editor from "@monaco-editor/react"; // Using monaco editor for code display
import "./SnippetDetail.css";

const SnippetDetail = () => {
  const { snippetid } = useParams();
  const [snippetData, setSnippetData] = useState({
    title: "",
    content: "",
    language: "",
    tags: [],
    notes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`/get-snippet/${snippetid}`);
        setSnippetData(res.data);
      } catch (err) {
        console.error("Error fetching snippet:", err);
      }
    };
    fetchSnippet();
  }, [snippetid]);

  return (
    <div>
      <Navbar />
      <div className="snippet-detail-container">
        <div className="snippet-title">{snippetData.title}</div>
        <div className="language-badge">{snippetData.language}</div>
        <div className="editor-container">
          <Editor
            width="100%"
            height={500}
            language={snippetData.language}
            value={snippetData.content}
            theme="vs-dark"
            options={{
              readOnly: true,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
            }}
          />
        </div>
        <p>Tags:</p>
        <div className="tags-container">
          {snippetData.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="notes-section">
          <div className="notes-title">Notes</div>
          <div className="notes-content">{snippetData.notes}</div>
        </div>
        <div className="button-container">
          <CustomButton label="Back" onClick={() => navigate("/library")} />
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;
