import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import SnippetPreview from "../components/SnippetPreview";
import axios from "axios";
import "./Library.css";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const { user, setUser } = useContext(UserContext);
  const [snippets, setSnippets] = useState([]); // State to hold current snippets
  const [allSnippets, setAllSnippets] = useState([]); // Holds all original snippets
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const navigate = useNavigate();

  // Fetch the user id again when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err.message, err);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user && user.id) {
      fetchSnippets(user.id);
    }
  }, [user]);

  const fetchSnippets = async () => {
    console.log("Fetching");
    try {
      // Make sure to pass the userId as part of the URL
      const res = await axios.get(`/getlibrary/${user.id}`);
      setSnippets(res.data.snippets);
      setAllSnippets(res.data.snippets); // Save the original snippets
      // console.log(res.data); // Log user snippets
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Apply filtering only when the search query changes
    if (searchQuery === "") {
      setSnippets(allSnippets); // Show all snippets when query is empty
    } else {
      const filteredSnippets = allSnippets.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          snippet.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSnippets(filteredSnippets); // Update displayed snippets
    }
  }, [searchQuery]); // Run this useEffect to filter whenever the search query changes

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update the search query on every keystroke
  };

  const handleEditSnippet = (snippetId) => {
    navigate(`/edit/${snippetId}`);
  };

  const handleDeleteSnippet = async (snippetId) => {
    try {
      await axios.delete(`/deletesnippet/${snippetId}`);
      fetchSnippets();
    } catch (err) {
      console.error("Error deleting snippet:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="library-container">
        <header>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Snippets..."
              onChange={handleSearch}
            />
            <button>Search</button>
          </div>
          <button className="add-snippet" onClick={() => navigate("/add")}>
            Add Snippet
          </button>
        </header>
        <div className="filters">
          <select>
            <option>Filter by Language</option>
            <option>Python</option>
            <option>JavaScript</option>
            <option>Java</option>
          </select>
          <select>
            <option>Sort by Date</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
        {snippets.length > 0 ? (
          <div className="snippet-grid">
            {snippets.map((snippet) => (
              <div className="snippet-card" key={snippet._id}>
                <div className="snippet-card-header">
                  <div>
                    <span className="snippet-card-title">{snippet.title}</span>
                    <span className="language">
                      Language: {snippet.language}
                    </span>
                  </div>
                  <span className="tags">
                    Tags: {snippet.tags.map((tag) => `#${tag}`).join(", ")}
                  </span>
                </div>
                <div className="snippet-preview">
                  <SnippetPreview content={snippet.content} />
                </div>
                <div>
                  <button onClick={() => handleEditSnippet(snippet._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSnippet(snippet._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              You don't have any snippets yet.{" "}
              <a href="/add">Add your first one!</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
