import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import "../SCSS/Login.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      alert("Invalid");
    }
  };
  return (
    <div>
      <form className="login-form" onSubmit={onSubmit}>
        <h2 className="heading-login">Log In</h2>

        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p className="user-msg">
        New User? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
