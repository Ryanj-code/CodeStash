import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SnippetForm from "../components/SnippetForm";
import axios from "axios";

const EditSnippet = () => {
  const { snippetid } = useParams(); // grab id from route link
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`/get-snippet/${snippetid}`);
        setInitialData(res.data);
      } catch (err) {
        console.error("Error fetching snippet:", err);
      }
    };
    fetchSnippet();
  }, [snippetid]);

  const handleEditSnippet = async (snippetData) => {
    try {
      await axios.post(`/edit-snippet/${snippetid}`, snippetData);
      navigate("/library");
    } catch (err) {
      console.error("Error editing snippet:", err);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <SnippetForm
        initialData={initialData}
        onSubmit={handleEditSnippet}
        heading="Edit Snippet"
        submitButtonText="Save Changes"
      />
    </div>
  );
};

export default EditSnippet;
