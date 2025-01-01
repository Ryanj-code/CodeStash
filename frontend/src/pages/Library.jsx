import React from "react";
import Navbar from "../components/Navbar";

const Library = () => {
  return (
    <div>
      <Navbar />
      <div class="library-container">
        <header>
          <div class="brand-name">CodeStash</div>
          <div class="search-bar">
            <input type="text" placeholder="Search Snippets..." />
            <button>Search</button>
          </div>
          <button class="add-snippet">Add Snippet</button>
        </header>
        <div class="filters">
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
        <div class="snippet-grid">
          <div class="snippet-card">
            <h3>Snippet Title</h3>
            <p>Language: Python</p>
            <p>Tags: #sorting, #arrays</p>
            <p class="snippet-preview"># Bubble Sort in Python...</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
        <div class="empty-state">
          <p>
            You don't have any snippets yet.{" "}
            <a href="/add">Add your first one!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Library;
