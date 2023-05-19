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

const UpdateRule = ({
  isOpen,
  onRequestClose,
  comQuestionData,
  comQuestionID,
  id,
}) => {
  console.log("AAAAAAAAAAAAAAAAAAAAA");
  console.log(comQuestionID);
  console.log(comQuestionData);
  console.log("BBBBBBBBBBBBBBBA");

  const [question, setQuestion] = useState([]);

  const sendQuestionData = async () => {
    await axios.patch(
      `/api/communityQuestion/updateQuestion/${comQuestionID}`,
      {
        question,
      }
    );

    window.location.href = `/community/${id}`;
  };

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
          <b>Edite your question</b>
        </h3>
      </div>{" "}
      <div>
        {" "}
        <form>
          <textarea
            defaultValue={comQuestionData}
            id="myTextArea"
            rows="4"
            cols="40"
            placeholder="Enter your text here..."
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </form>
      </div>
      <Box m="20px">
        <button
          className="acceptMember"
          onClick={(e) => {
            sendQuestionData();
          }}
        >
          Update details
        </button>
      </Box>
    </Model>
  );
};

export default UpdateRule;
