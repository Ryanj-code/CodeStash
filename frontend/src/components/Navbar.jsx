import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "/icon.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="left-section" onClick={() => navigate("/")}>
        <div>
          <img src={icon} alt="Website Icon" className="website-icon" />
        </div>
        <div>CodeStash</div>
      </div>
      <div className="right-section">
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
};

export default Navbar;
