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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnswerForm = ({ isOpen, onRequestClose, communityID, answerData }) => {
  const [request, setRequset] = useState([]);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPPPPPPPPPPP");

  let obj;
  if (isOpen) {
    console.log(answerData);
    obj = answerData.answer.answer;
    console.log(obj);
  }
  //   useEffect(() => {
  //     if (isOpen) {
  //       axios
  //         .get(
  //           `http://localhost:8080/api/communityAnswer/getOneRequest/${answerData}`
  //         )
  //         .then((response) => {
  //           setRequset(response);
  //         });
  //     }
  //   }, []);
  const RejectMember = () => {
    axios
      .delete(
        `http://localhost:8080/api/communityAnswer/deleteRequest/${answerData._id}`
      )
      .then(() => {
        toast.success(`User request  accepted successfully`, {
          position: "Member rejected",
        });
        setTimeout(() => {
          window.location.href = `/community/${communityID}`;
        }, 1000);
      });
  };
  const AcceptMember = () => {
    axios
      .post("http://localhost:8080/api/communityMember/createCommunityMember", {
        userID: answerData.userId,
        name: answerData.userName,
        pic: answerData.proPic,
        comId: answerData.commID,
        role: "member",
      })
      .then(() => {
        axios
          .delete(
            `http://localhost:8080/api/communityAnswer/deleteRequest/${answerData._id}`
          )
          .then(() => {
            toast.success(`User request  rejected successfull`, {
              position: "Member rejected",
            });
            setTimeout(() => {
              window.location.href = `/community/${communityID}`;
            }, 1000);
          });
      });
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
      {isOpen ? (
        <div>
          {" "}
          <div style={{ marginBottom: "10px" }}>
            <h3>
              <b>Member answer form</b>
            </h3>
          </div>
          <ol>
            {Object.entries(obj).map(([key, value]) => {
              return (
                <div>
                  {" "}
                  <li>
                    {key}
                    <p style={{ margin: "10px" }}>Answer :- {value}</p>
                  </li>
                </div>
              );
            })}
          </ol>
        </div>
      ) : (
        <></>
      )}

      <Box m="20px">
        <button
          className="acceptMember"
          onClick={(e) => {
            AcceptMember();
          }}
        >
          Accept
        </button>
        <button
          className="rejectMember"
          onClick={(e) => {
            RejectMember();
          }}
        >
          Reject
        </button>
      </Box>
    </Model>
  );
};

export default AnswerForm;
