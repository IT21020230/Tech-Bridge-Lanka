import React, { Component } from "react";

import { Grid, Card } from "@mui/material";

import "./index.css";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import Model from "react-modal";

import axios from "axios";

const UpdateRule = ({ isOpen, onRequestClose, comData }) => {
  console.log("AAAAAAAAAAAAAAAAAAAAA");
  console.log(comData);
  console.log("BBBBBBBBBBBBBBBA");
  return (
    <Model
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backdropFilter: "blur(5px)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",

          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h3>
          <b>Member answer form</b>
        </h3>
      </div>{" "}
      <form></form>
      <Box m="20px">
        <button className="acceptMember">Update details</button>
      </Box>
    </Model>
  );
};

export default UpdateRule;
