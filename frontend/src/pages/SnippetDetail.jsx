import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomButton from "../components/CustomButton";
import IconSelector from "../components/IconSelector";
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

  const handleDownload = (snippetData) => {
    const { title, language, content } = snippetData;
    const fileExtension = getFileExtension(language);
    const fileName = `${title}.${fileExtension}`;

    // Create a Blob with the snippet content
    const blob = new Blob([content], { type: "text/plain" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  // Helper function to map language to file extension
  const getFileExtension = (language) => {
    switch (language) {
      case "python":
        return "py";
      case "c":
        return "c";
      case "cpp":
        return "cpp";
      case "csharp":
        return "cs";
      case "java":
        return "java";
      case "javascript":
        return "js";
      case "go":
        return "go";
      case "sql":
        return "sql";
      case "php":
        return "php";
      case "rust":
        return "rs";
      default:
        return "txt";
    }
  };
  return (
    <div>
      <Navbar />
      <div className="snippet-detail-container">
        <div className="snippet-title">
          {snippetData.title}
          <IconSelector
            iconType={8}
            onClick={() => {
              handleDownload(snippetData);
            }}
          />
        </div>
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
            <div key={index} className="tag">
              {tag}
            </div>
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
