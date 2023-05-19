import React, { useState } from "react";
import "./index.css";
import { Grid } from "@mui/material";
const App = () => {
  const goMap = () => {
    window.location.href = `/Map-live`;
  };

  const createCommunity = () => {
    window.location.href = `/createCommunity`;
  };
  return (
    <div className="content1">
      <Grid container spacing={0}>
        <Grid items xs={4}></Grid>
        <Grid items xs={5}>
          {" "}
          <h1 className="headFont" style={{ marginTop: "100px" }}>
            Welcome to
          </h1>
        </Grid>
        <Grid items xs={6.0}></Grid>
        <Grid items xs={6}>
          <h1 className="headFont2">Tech Bridge Lanka</h1>
        </Grid>
        <Grid item xs={6.5}></Grid>
        <Grid item xs={5}>
          <p>
            We believe in minimizing the digital divide and ensuring that
            everyone has equal access to information and opportunities online.
            Our mission is to bridge the gap by providing a reliable and
            accessible web address for all. With our initiative, we strive to
            make the internet more inclusive and empower individuals and
            communities to connect, learn, and thrive in the digital world.
            Together, we can make a difference and ensure that no one is left
            behind in the digital age. Start exploring, connecting, and creating
            at our web address and be part of the change!
          </p>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={1}>
          <button
            className="mapBTN"
            onClick={() => {
              goMap();
            }}
          >
            DDD Map
          </button>
        </Grid>
        <Grid item xs={2}>
          <button
            className="createCom"
            onClick={() => {
              createCommunity();
            }}
          >
            Create community
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
