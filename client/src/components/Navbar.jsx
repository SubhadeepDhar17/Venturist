import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [getID, setGetID] = useState("");
  const navigate = useNavigate();

  // const userID = window.localStorage.getItem('userID')
  // setGetID(userID)

  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    if (userID !== undefined || userID !== null) {
      setGetID(userID);
    }
  }, [getID]);

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  return (
    <div className="container">
      <div className="logo">
        <Link to="/">Nexnd</Link>
      </div>
      <Link to="/pitches">Jobs</Link>
      <Link to="/pitch-ideas">Post A Job</Link>
      {cookies.access_token === "" ||
      cookies.access_token === undefined ||
      cookies.access_token === "undefined" ? (
        <>
          <Link to="/login">Log In</Link>
        </>
      ) : (
        <>
        <Link to='/profile'>Profile</Link>
          <button onClick={Logout}>Logout</button>
        </>
      )}
    </div>
  );
};

{
  /* {!getID ? (
  <>
    <Link to="/login">Log In</Link>
  </>
) : (
  <>
  <Link to='/pitches'>Pitches</Link>
  <Link to='/pitch-ideas'>Pitch Ideas</Link>
  <button onClick={Logout}>Logout</button>
  </>
)} */
}
