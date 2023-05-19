import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../components/Editor";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "../index.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("community", community);
    data.set("file", files[0]);
    ev.preventDefault();
    try {
      const response = await fetch("/api/posts/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      }
    } catch {
      console.log("error");
    }
  }

  if (redirect) {
    return <Navigate to={"/posts"} />;
  }
  return (
    <main>
      <Navbar />
      <div className="content">
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div style={{}}>
              <h1>Create Post</h1>
              <form onSubmit={createNewPost}>
                <input
                  type="title"
                  placeholder={"Title"}
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                />
                <br /> <br />
                <input
                  type="summary"
                  placeholder={"Summary"}
                  value={summary}
                  onChange={(ev) => setSummary(ev.target.value)}
                />
                <br /> <br />
                <select
                  value={community}
                  onChange={(ev) => setCommunity(ev.target.value)}
                >
                  <option value="">Select a community</option>
                  <option value="Community 1">Community 1</option>
                  <option value="Community 2">Community 2</option>
                  <option value="Community 3">Community 3</option>
                  {/* Add more options for communities as needed */}
                </select>
                <br /> <br />
                <input
                  type="file"
                  onChange={(ev) => setFiles(ev.target.files)}
                />
                <br />
                <br />
                <Editor value={content} onChange={setContent} />
                <button
                  style={{
                    marginTop: "10px",
                    border: "0px",
                    backgroundColor: "#459c98",
                    padding: "10px",
                  }}
                >
                  Create post
                </button>
              </form>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <Footer />
    </main>
  );
}
