import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import SnippetForm from "../components/SnippetForm";
import axios from "axios";

const AddSnippet = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddSnippet = async (snippetData) => {
    try {
      const data = {
        snippetData,
        userID: user.id,
      };
      await axios.post("/addsnippet", data);
      navigate("/library");
    } catch (err) {
      console.error("Error adding snippet:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <SnippetForm
        initialData={{
          title: "",
          content: "",
          language: "python",
          tags: [],
          notes: "",
        }}
        onSubmit={handleAddSnippet}
        heading="Create Snippet"
        submitButtonText="Add Snippet"
      />
    </div>
  );
};

export default AddSnippet;
