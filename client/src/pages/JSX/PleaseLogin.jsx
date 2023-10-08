import React from "react";
import "../SCSS/PleaseLogin.scss";
import { Link } from "react-router-dom";

export const PleaseLogin = () => {
  return (
    <div className="please-login">
      Please&nbsp; <Link to="/login"><button>Login</button></Link>
      &nbsp; First
    </div>
  );
};
