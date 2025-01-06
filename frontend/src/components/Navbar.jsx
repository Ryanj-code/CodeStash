import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import icon from "/icon.png";
import DarkModeButton from "../components/DarkModeButton";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [darkTheme, setDarkTheme] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setUser(null); // Clear the user from context after logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    // You can also save the theme preference in localStorage for persistence
    document.body.classList.toggle("dark-theme", darkTheme);
  };

  return (
    <div className="navbar">
      <div className="left-section" onClick={() => navigate("/")}>
        <div>
          <img src={icon} alt="Website Icon" className="website-icon" />
        </div>
        <div>CodeStash</div>
      </div>
      <div className="right-section">
        <DarkModeButton toggleTheme={toggleTheme} />
        {user ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <div className="button-container">
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
