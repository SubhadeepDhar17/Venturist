import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Post = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [post, setPost] = useState([]);
  const postID = useParams().id;
  const token = cookies.access_token;
  const navigate = useNavigate()

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pitchesOwner/" + postID,
          config
        );
        setPost(response.data);
      } catch (e) {
        alert("Server error");
      }
    };

    fetchSinglePost();
  }, []);

  const onDelete = async (req, res) => {
    try {
      await axios.delete(
        "http://localhost:5000/pitchesOwner/" + postID,
        config
      );
      alert('Job Posting Deleted')
      navigate('/profile')
    } catch (e) {}
  };

  console.log(post);

  return (
    <div>
      <h1>{post.company}</h1>
      <div>{post.salary}</div>
      <div>{post.jobLocation}</div>
      <div>{post.ideas}</div>
      <button onClick={onDelete}>Delete Job Posting</button>
    </div>
  );
};

export default Post;
