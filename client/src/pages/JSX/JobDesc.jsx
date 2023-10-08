import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PostRender = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [post, setPost] = useState([]);
  const postID = useParams().id;
  const token = cookies.access_token;

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pitchesDesc/" + postID
        );
        setPost(response.data);
      } catch (e) {
        alert("Server error");
      }
    };

    fetchSinglePost();
  }, []);

  return (
    <div>
      <h1>{post.company}</h1>
      <div>{post.salary}</div>
      <div>{post.jobLocation}</div>
      <div>{post.ideas}</div>
    </div>
  );
};

export default PostRender;
