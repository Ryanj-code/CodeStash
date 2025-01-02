import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Form.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/library");
    }
  }, [user]);

  const handleChange = (ev) => {
    setData({
      ...data, // Spread the current state
      [ev.target.name]: ev.target.value, // Update only the modified field
    });
  };

  const handleSignup = async (ev) => {
    ev.preventDefault();
    console.log("Signup with", data); // Log the current state

    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      console.log("Signup successful.");
      navigate("/");
    } catch (err) {
      console.log("Signup failed.", err);
    }
  };

  return (
    <div className="form-bg">
      <div className="wrapper">
        <p>Sign Up</p>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email" // Suggest email address
          />
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username" // Suggest username
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="password" // Suggest current password
          />

          <button type="submit">Sign Up</button>
        </form>
        <div className="alt-option">
          <p className="alt-option-text">Have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Signup;
