import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../components/Editor";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "../index.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/api/posts/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setCommunity(postInfo.community);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("community", community);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    try {
      const response = await fetch("/api/posts/post", {
        method: "PUT",
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
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <main>
      <Navbar />
      <div className="content">
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div style={{}}>
              <h1>Edit Post</h1>
              <form onSubmit={updatePost}>
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
                  Update post
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
