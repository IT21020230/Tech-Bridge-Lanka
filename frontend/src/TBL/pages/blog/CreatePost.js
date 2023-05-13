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
    data.set("author", "6453a8bcc6d9e14527bdf3e1");
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/api/posts/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
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
                <input
                  type="text"
                  placeholder={"Community"}
                  value={community}
                  onChange={(ev) => setCommunity(ev.target.value)}
                />
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
