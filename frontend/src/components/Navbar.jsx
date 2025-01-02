import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import icon from "/icon.png";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // You can also handle logout logic here, for example, clearing cookies, etc.
      await axios.post("/logout"); // Assuming you have a backend route for logging out
      setUser(null); // Clear the user from context after logout
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
        <div>
          {user ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
              <button onClick={() => navigate("/login")}>Log In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
