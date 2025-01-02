import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Library.css";

const Library = () => {
  const { user, setUser } = useContext(UserContext);
  const [snippets, setSnippets] = useState([]); // State to hold the snippets

  // Fetch the user id again when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
        // console.log("User data fetched:", data);
      } catch (err) {
        console.error("Error fetching user profile:", err.message, err);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user && user.id) {
      //fetchSnippets(user.id);
      console.log("Got ID");
    }
  }, [user]);

  const fetchSnippets = async (userID, search, language, tags) => {
    console.log("Fetching");
  };

  // Handle search functionality (optional)
  const handleSearch = (e) => {
    // Logic for search can be added here
    console.log("Search query:", e.target.value);
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
          <button className="add-snippet">Add Snippet</button>
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
                <div className="snippet-card-title">{snippet.title}</div>
                <span className="language">Language: {snippet.language}</span>
                <span className="tags">
                  Tags: {snippet.tags.map((tag) => `#${tag}`).join(", ")}
                </span>
                <p className="snippet-preview">{snippet.preview}</p>
                <div>
                  <button>Edit</button>
                  <button>Delete</button>
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
