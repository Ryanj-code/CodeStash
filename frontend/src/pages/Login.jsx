import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data, // Spread the current state
      [e.target.name]: e.target.value, // Update only the modified field
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form with", data); // Log the current state
    navigate("/");
  };

  return (
    <div className="form-bg">
      {/*
      <div className="form-header" onClick={() => navigate("/")}>
        <div>
          <img src="/icon.png" alt="Website Icon" className="website-icon" />
        </div>
        <div>CodeStash</div>
      </div>
      */}
      <div className="wrapper">
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email" // Suggest email address
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password" // Suggest current password
          />
          <button type="submit">Login</button>
        </form>
        <div className="option">
          <p className="option-text">Don't have an account?</p>
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
