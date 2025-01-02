import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Form.css";

const Login = () => {
  const [data, setData] = useState({
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

  const handleLogin = async (ev) => {
    ev.preventDefault();
    console.log("Login with", data); // Log the current state

    try {
      const res = await axios.post("/login", data);
      setUser(res.data);
      console.log("Login successful.");
      navigate("/");
    } catch (err) {
      console.log("Login failed.", err);
    }
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
        <form onSubmit={handleLogin}>
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
            autoComplete="password" // Suggest current password
          />
          <button type="submit">Login</button>
        </form>
        <div className="alt-option">
          <p className="alt-option-text">Don't have an account?</p>
          <Link to="/signup">Sign up here</Link>
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Login;
