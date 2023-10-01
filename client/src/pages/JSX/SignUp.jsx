import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../SCSS/Login.scss";
import { useCookies } from "react-cookie";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });

      setCookies("access_token", response.data.token)
      navigate('/')
      alert("You have succesfully Signed up");
    } catch (err) {
      alert("Username taken")
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={onSubmit}>
        <h2 className="heading-login">Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p className="user-msg">
        Existing User? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};
