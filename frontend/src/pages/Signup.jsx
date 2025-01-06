import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import "./Form.css";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (ev, data) => {
    ev.preventDefault();
    console.log("Signup with", data);

    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      console.log("Signup successful.");
      navigate("/library");
    } catch (err) {
      console.log("Signup failed.", err);
    }
  };

  return (
    <div className="form-bg">
      <div className="wrapper">
        <AuthForm
          formTitle={"Sign Up"}
          user={user}
          isSignup={true}
          handleSubmit={handleSignup}
          buttonText={"Sign up"}
        />
        <div className="alt-option">
          <p className="alt-option-text">Don't have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Signup;
