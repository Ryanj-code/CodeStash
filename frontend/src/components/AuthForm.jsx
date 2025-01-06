import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ user, isSignup, handleSubmit, buttonText }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Redirect to library if user is already logged in
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

  return (
    <form onSubmit={(ev) => handleSubmit(ev, data)}>
      {isSignup && (
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
        />
      )}
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="password"
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
