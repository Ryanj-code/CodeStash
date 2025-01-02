import React from "react";
import Navbar from "../components/Navbar";
import "./Library.css";

const Library = () => {
  const mockSnippets = [
    {
      id: 1,
      title: "Bubble Sort Algorithm",
      language: "Python",
      tags: ["sorting", "arrays"],
      preview: "# Bubble Sort in Python...\ndef bubbleSort(arr):...",
    },
    {
      id: 2,
      title: "React useState Example",
      language: "JavaScript",
      tags: ["react", "hooks"],
      preview: "// React useState Example\nimport React, { useState }...",
    },
    {
      id: 3,
      title: "Prime Number Check",
      language: "Java",
      tags: ["math", "algorithms"],
      preview:
        "// Check for Prime Number in Java\npublic boolean isPrime(int n) {...",
    },
    {
      id: 4,
      title: "Merge Sort Algorithm",
      language: "C++",
      tags: ["sorting", "divide-and-conquer"],
      preview:
        "// Merge Sort Implementation\nvoid mergeSort(int arr[], int l, int r)...",
    },
    {
      id: 5,
      title: "CSS Flexbox Cheat Sheet",
      language: "CSS",
      tags: ["css", "layout"],
      preview:
        "/* Center elements with Flexbox */\n.container { display: flex; ... }",
    },
    {
      id: 6,
      title: "Python Flask API Example",
      language: "Python",
      tags: ["web", "flask", "api"],
      preview:
        "# Basic Flask API Example\nfrom flask import Flask\napp = Flask(__name__)\n...",
    },
    {
      id: 7,
      title: "SQL Inner Join Example",
      language: "SQL",
      tags: ["database", "query"],
      preview:
        "-- SQL Inner Join Query\nSELECT * FROM table1\nINNER JOIN table2 ON table1.id = table2.id;",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="library-container">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Search Snippets..." />
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
        <div className="snippet-grid">
          {mockSnippets.length > 0 ? (
            mockSnippets.map((snippet) => (
              <div className="snippet-card" key={snippet.id}>
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
            ))
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
    </div>
  );
};

export default Library;
