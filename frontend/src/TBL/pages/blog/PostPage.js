import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
// import {UserContext} from "../UserContext";
import { Link } from "react-router-dom";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "../index.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  // const {userInfo} = useContext(UserContext);
  const { user } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:7000/api/posts/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <main>
      <Navbar />
      <div className="content">
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div className="post-page">
              <h1>{postInfo.title}</h1>
              <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
              <div className="author">Published by {postInfo.community}</div>

              {user && (user.role === "admin" || user.role === "moderator") ? (
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                  Edit this post
                </Link>
              ) : null}
              <div className="image">
                <img
                  style={{ width: "100vh" }}
                  src={`http://localhost:7000/${postInfo.cover}`}
                  alt=""
                />
              </div>
              <div
                style={{ marginTop: "10px" }}
                className="content"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <Footer />
    </main>
  );
}
