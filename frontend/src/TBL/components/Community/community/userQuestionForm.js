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

const QuestionForm = ({ isOpen, onRequestClose, communityID, userID }) => {
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
      <Box m="20px">
        {" "}
        <div
          style={{
            backgroundColor: "#E8E8E8",
            marginLeft: "200px",
            marginRight: "200px",

            padding: "50px",
          }}
        >
          <div>
            <h1 className="head">Question Form</h1>
          </div>
          {/* {comQuestions.map((data) => {
            <label>{data.question}</label>;
          })} */}
          <Button className="submitBTN" type="submit">
            Submit form
          </Button>
        </div>
      </Box>
    </Model>
  );
};

export default QuestionForm;