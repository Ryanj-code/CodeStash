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
        const res = await axios.get(`/getsnippet/${snippetid}`);
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
        <div>{snippetData.title}</div>
        <div>{snippetData.language}</div>
        <Editor
          width={500}
          height={500}
          language={snippetData.language}
          value={snippetData.content}
          theme="vs-dark" // Optional: Dark theme
          options={{
            readOnly: true, // Disable editing
            scrollBeyondLastLine: false, // Optional: Prevent excessive scrolling
            minimap: { enabled: false }, // Optional: Hide the minimap
          }}
        />
        <div>{snippetData.tags}</div>
        <div>{snippetData.notes}</div>
        <CustomButton label="Back" onClick={() => navigate("/library")} />
      </div>
    </div>
  );
};

export default SnippetDetail;
