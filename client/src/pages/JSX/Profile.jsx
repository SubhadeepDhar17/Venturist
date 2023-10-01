import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const Profile = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState("");

  const token = cookies.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/me",
          config
        );
        setProfile(response.data);
      } catch (e) {}
    };
    fetchProfile();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5000/users/me",
        {
          username,
        },
        config
      );
      alert("Saved. Please refresh to view changes");
    } catch (e) {
      alert("Invalid updates");
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete("http://localhost:5000/users/me", config);
      alert ('User Profile Deleted')
      setCookies("access_token", '')
      window.localStorage.removeItem('userID')
    } catch (e) {
      alert('Invalid action')
    }
  };

  return (
    <div>
      <h1>{profile.username}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Edit</button>
      </form>
      <button onClick={onDelete}>Delete User</button>
    </div>
  );
};

export default Profile;
