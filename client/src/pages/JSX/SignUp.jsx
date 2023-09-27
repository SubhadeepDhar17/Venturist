import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import "../SCSS/Login.scss";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      alert("You have succesfully Signed up");
    } catch (err) {
      console.log(err);
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
