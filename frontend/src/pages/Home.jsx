import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import IconSelector from "../components/IconSelector";
import "./Home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/library`);
    }
  }, [user]);

  const scrollDown = () => {
    const contentSection = document.getElementById("features"); // ID of the section you want to scroll to
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <h1 className="hero-title">
            Your Personal Code Library,{" "}
            <span style={{ color: "#22c55e" }}>Organized</span>
          </h1>
          <p className="hero-subtitle">
            Store and retrieve your code snippets efficiently. Never lose that
            useful piece of code again.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        </div>

        <div className="scroll-down">
          <IconSelector iconType={6} onClick={scrollDown} color="#22c55e" />
        </div>

        <div className="features" id="features">
          <h2>Everything You Need to Manage Your Code Snippets</h2>
          <div className="feature-list">
            <IconSelector iconType={3} color="#22c55e" />
            <h3>Simple to Use</h3>
            <p>
              Intuitive interface for adding and editing snippets. Syntax
              highlighting for programming languages.
            </p>
          </div>
          <div className="feature-list">
            <IconSelector iconType={1} color="#22c55e" />
            <h3>Filtering</h3>
            Find your code snippets instantly with powerful search and filters.
            Tag system for easy organization and retrieval.
          </div>
          <div className="feature-list">
            <IconSelector iconType={5} color="#22c55e" />
            <h3>Detailed View</h3>
            Add notes, descriptions, and usage examples to your snippets.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
