import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/library`);
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <p>Manage your Code Snippets with CodeStash.</p>
          <button onClick={() => navigate("/signup")}>Get Started</button>
        </div>
        <div className="features">
          <div className="feature-list">
            <h3>Simple to Use</h3>
            <p>
              Easily add and edit your code snippets through an intuitive
              interface.
            </p>
          </div>
          <div className="feature-list">
            <h3>Filtering</h3>
            <p>
              Search and filter your code snippets using tags that you set up.
            </p>
          </div>
          <div className="feature-list">
            <h3>Detailed View</h3>
            <p>
              Look at your snippets with the syntax highlighted and add notes to
              them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
