import Post from "../../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "../index.css";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/posts/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <main>
      <div className="content">
        <Navbar />
        <Grid container spacing={0}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {posts.length > 0 && posts.map((post) => <Post {...post} />)}
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Footer />
      </div>
    </main>
  );
}
