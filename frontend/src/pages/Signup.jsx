import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
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
      <div className="wrapper">
        <p>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username" // Suggest username
          />
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

          <button type="submit">Sign Up</button>
        </form>
        <div className="option">
          <p className="option-text">Have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
