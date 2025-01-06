import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AuthForm from "../components/AuthForm"; // Assuming AuthForm is reusable
import axios from "axios";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (ev, data) => {
    ev.preventDefault();
    // console.log("Login with", data);

    try {
      const res = await axios.post("/login", data);
      setUser(res.data);
      navigate("/library");
    } catch (err) {
      console.log("Login failed.", err);
    }
  };

  return (
    <div className="form-bg">
      <div className="wrapper">
        <AuthForm
          formTitle={"Login"}
          user={user}
          handleSubmit={handleLogin}
          buttonText="Login"
          isSignup={false}
        />
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
