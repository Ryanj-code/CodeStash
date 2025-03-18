import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import SnippetPreview from "../components/SnippetPreview";
import CustomButton from "../components/CustomButton";
import IconSelector from "../components/IconSelector";
import axios from "axios";
import "./Library.css";

const Library = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [snippets, setSnippets] = useState([]); // State to hold current snippets
  const [allSnippets, setAllSnippets] = useState([]); // Holds all original snippets
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null); // State for snippetId to be deleted
  const [filterModal, setFilterModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // Language filter
  const [selectedSort, setSelectedSort] = useState("Newest"); // Time filter
  const navigate = useNavigate();

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
    try {
      const res = await axios.get(`/get-library/${user.id}`);
      setAllSnippets(res.data.snippets); // Saves 2 copies of all snippets
      setSnippets(res.data.snippets);
      // console.log(res.data); // Log user snippets
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filteredSnippets = [...allSnippets]; // Create a copy of allSnippets to modify

    if (searchQuery === "") {
      filteredSnippets = allSnippets; // Show all snippets when query is empty
    } else {
      filteredSnippets = allSnippets.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          snippet.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply language filter if possible
    if (selectedLanguage) {
      filteredSnippets = filteredSnippets.filter(
        (snippet) => snippet.language === selectedLanguage
      );
    }

    // Apply sorting filter
    filteredSnippets = filteredSnippets.slice().sort(
      (a, b) =>
        selectedSort === "Newest"
          ? new Date(b.createdAt) - new Date(a.createdAt) // Newest First
          : new Date(a.createdAt) - new Date(b.createdAt) // Oldest First
    );

    setSnippets(filteredSnippets); // Update the state with the filtered and/or sorted snippets
  }, [searchQuery, selectedLanguage, selectedSort]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleEditSnippet = (snippetId) => {
    navigate(`/edit/${snippetId}`);
  };

  const handleDeleteClick = (snippetId) => {
    // After user clicks delete, set deleteID and open modal
    setDeleteID(snippetId);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    // After user clicks cancel, reset deleteID and close modal
    setDeleteModal(false);
    setDeleteID(null);
  };

  const handleDeleteSnippet = async () => {
    // After user confirms delete snippet
    if (deleteID) {
      try {
        await axios.delete(`/delete-snippet/${deleteID}`, {
          data: { userID: user.id }, // Send user.id as part of the request body
        });
        fetchSnippets();
      } catch (err) {
        console.error("Error deleting snippet:", err);
      }
    }

    setDeleteModal(false);
    setDeleteID(null); // Reset id to be deleted
  };

  const handleFilter = () => {
    setFilterModal(true);
  };

  const handleFilterDone = () => {
    setFilterModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="library-container">
        <div className="library-header">
          <div className="search-bar">
            <IconSelector iconType={1} />
            <input
              type="text"
              placeholder="Search Snippets..."
              onChange={handleSearch}
            />
            <IconSelector iconType={2} onClick={handleFilter} />
          </div>
          <div>
            <CustomButton
              label="Add Snippet"
              onClick={() => navigate("/add")}
            />
          </div>
        </div>

        {deleteModal && (
          <div className="delete-modal">
            <div className="delete-modal-content">
              <p>Are you sure you want to delete this snippet?</p>
              <CustomButton label="Yes" onClick={handleDeleteSnippet} />
              <CustomButton label="Cancel" onClick={handleCancelDelete} />
            </div>
          </div>
        )}

        {filterModal && (
          <div className="filter-modal">
            <div className="filters">
              <h3>Search Filters</h3>
              <div className="filter-options">
                <div className="filter-language">
                  Language
                  <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    <option value="">All Languages</option>
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
                <div className="filter-time">
                  Sort by Time
                  <select value={selectedSort} onChange={handleSortChange}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </div>
              <CustomButton label="Done" onClick={handleFilterDone} />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <p>Loading snippets...</p>
          </div>
        ) : allSnippets.length > 0 ? (
          <div className="snippet-grid">
            {snippets.length > 0 ? (
              snippets.map((snippet) => (
                <div className="snippet-card" key={snippet._id}>
                  <div className="snippet-card-header">
                    <div className="snippet-card-header-2">
                      <span className="snippet-card-title">
                        {snippet.title}
                      </span>
                      <a
                        className="snippet-card-link"
                        onClick={() => navigate(`/snippet/${snippet._id}`)}
                      >
                        <IconSelector iconType={5} />
                      </a>
                    </div>
                    <span className="language">
                      Language: {snippet.language}
                    </span>
                    <span className="tags">
                      Tags: {snippet.tags.map((tag) => `#${tag}`).join(", ")}
                    </span>
                  </div>
                  <SnippetPreview content={snippet.content} />
                  <div className="snippet-buttons">
                    <button onClick={() => handleEditSnippet(snippet._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(snippet._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No snippets match your search.</p>
            )}
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
