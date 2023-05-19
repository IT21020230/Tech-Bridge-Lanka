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
  const [question, setQuestion] = useState([]);
  const [answer, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`/api/communityQuestion/getAllQuestion/${communityID}`)
      .then((response) => {
        setQuestion(response.data);
      });
  }, []);

  //   useEffect(() => {
  //     axios.get(`/api/user/${userID}`).then((response) => {
  //       setQuestion(response.data);
  //     });
  //   }, []);

  const handleInputChange = (event, question) => {
    const { value } = event.target;
    setAnswers((prevState) => ({
      ...prevState,
      [question]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // Prepare data object for storing answer
    event.preventDefault();
    await axios.get(`/api/user/${userID}`).then(async (response) => {
      //   setQuestion(response.data);
      console.log(response.data);
      const data = {
        answer: answer,
      };
      console.log(data);
      let data2 = [];
      data2.push(data);

      await axios
        .post("/api/communityAnswer/createCommunityAnswer", {
          commID: communityID,
          answer: data,
          userId: userID,
          userName: response.data.name,
          proPic: response.data.photo,
        })
        .then(() => {
          window.location.href = `/community/${communityID}`;
        });
    });

    // // Make API call to store answer
    // axios
    //   .post("/api/answer", data)
    //   .then((response) => {
    //     console.log("Answer stored successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Model
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backdropFilter: "blur(1px)",
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
            // marginLeft: "200px",
            // marginRight: "200px",

            padding: "80px",
          }}
        >
          <div>
            <h1 className="head">Question Form</h1>
          </div>{" "}
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <ol>
              <Grid container spacing={1} width={"750px"}>
                {question.map((data) => {
                  return (
                    <>
                      <Grid item xs={12}>
                        <li>
                          {" "}
                          <label>{data.question}</label>
                        </li>
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          type="text"
                          style={{ width: "100%" }}
                          onChange={(event) =>
                            handleInputChange(event, data.question)
                          }
                          required
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>{" "}
            </ol>
            <Button className="submitBTN" type="submit">
              Submit form
            </Button>
          </form>
        </div>
      </Box>
    </Model>
  );
};

export default QuestionForm;
