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

const UpdateModal = ({ isOpen, onRequestClose, comData }) => {
  console.log("AAAAAA");
  const [communityData, setComData] = useState([]);
  const [vission, setVission] = useState();
  const [Mission, setMission] = useState();

  const [faceBookLink, setFaceBookLink] = useState("");
  const [instergrameLink, setInstergrameLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [size, setSize] = useState();

  const [logo, setLogoFileName] = useState("");
  const [logoFileData, setLogoFileData] = useState(null);
  const [coverPic, setCoverFileName] = useState("");
  const [coverFileData, setCoverFileData] = useState(null);
  const [checkLogo, setCheckLogo] = useState(false);
  const [checkCover, setCheckCover] = useState(false);
  const [logoERR, setLOGOERR] = useState({});
  const [coverERR, setCoverERR] = useState({});

  const handleMissionChange = (event) => setMission(event.target.value);

  const handleFaceBookChange = (event) => setFaceBookLink(event.target.value);

  const logoChangeHandler = (e) => {
    const file = e.target.files[0];
    const imageERR = {};

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    const extension = file.name.split(".").pop().toLowerCase();
    const isValidExtension = allowedExtensions.includes(extension);

    if (isValidExtension) {
      imageERR.imageshort = "";
      setLogoFileData(file);
      setLogoFileName(file.name);
      setCheckLogo(true);
    } else {
      imageERR.imageshort =
        "Please select an image file (JPG, JPEG, PNG, GIF)!";
      setLogoFileData(null);
      setLogoFileName("");
      setCheckLogo(false);
    }

    setLOGOERR(imageERR);
  };
  const coverChangeHandler = (e) => {
    const file = e.target.files[0];
    const coverERR = {};

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"]; // Add any additional allowed extensions if needed
    const extension = file.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(extension)) {
      coverERR.cover = "";
      setCoverFileData(file);
      setCoverFileName(file.name);
      setCheckCover(true);
    } else {
      coverERR.cover = "Please select an image file (JPG, JPEG, PNG, GIF)!";
      setCoverFileData(null);
      setCoverFileName("");
      setCheckCover(false);
    }

    setCoverERR(coverERR);
  };

  useEffect(() => {
    axios.get(`/api/community/getCommunity/${comData}`).then((response) => {
      setComData(response.data);
    });
  }, []);
  console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
  console.log(communityData[0]);

  const sendData = async () => {
    const data = new FormData();

    data.append("image", logoFileData);
    console.log("BBBBBBBBBBBB");
    console.log(logoFileData);
    await fetch("/logo", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log(result);
        console.log("File sent successful");
        console.log(logoFileData);
        // setfileName("");
        // setFileData(null);
      })
      .catch((error) => {
        console.log(error.message);
      });

    const data2 = new FormData();

    data2.append("image", coverFileData);
    await fetch("/cover", {
      method: "POST",
      body: data2,
    })
      .then((result) => {
        console.log(result);
        console.log("File sent successful");
        console.log(logoFileData);
        // setfileName("");
        // setFileData(null);
      })
      .catch((error) => {
        console.log(error.message);
      });

    await axios.patch(`/api/community/updateCommunity/${comData}`, {
      vission,
      Mission,
      faceBookLink,
      instergrameLink,
      whatsappLink,
      email,
      contactNumber,
      coverPic,
      logo,
      size,
    });
    window.location.href = `/community/${comData}`;
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
          <b>Member answer form</b>
        </h3>
      </div>{" "}
      <form>
        {communityData.map((data) => {
          return (
            <Grid container spacing={1} width={"700px"}>
              <Grid item xs={2.7}>
                <lable>community Name</lable>
              </Grid>
              <Grid item xs={3.4}>
                <input value={data.commName} type="text" disabled />
              </Grid>
              <br />
              <Grid item xs={2.5}>
                <lable>Location</lable>
              </Grid>
              <Grid item xs={3.4}>
                <input value={data.location} type="text" disabled />{" "}
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>Started Date</lable>
              </Grid>
              <Grid item xs={3.4}>
                <input value={data.startedDate} type="text" disabled />{" "}
              </Grid>
              <br />
              <Grid item xs={2.5}>
                <lable>community size</lable>
              </Grid>
              <Grid item xs={3.4}>
                <input
                  defaultValue={data.size}
                  type="number"
                  onChange={(e) => setSize(e.target.value)}
                />{" "}
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>Vission</lable>
              </Grid>
              <Grid item xs={8}>
                <textarea
                  defaultValue={data.vission}
                  id="myTextArea"
                  rows="4"
                  cols="40"
                  placeholder="Enter your text here..."
                  onChange={(e) => setVission(e.target.value)}
                ></textarea>
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>Mission</lable>
              </Grid>
              <Grid item xs={8}>
                <textarea
                  id="myTextArea"
                  defaltValue={data.Mission}
                  rows="4"
                  cols="40"
                  placeholder="Enter your text here..."
                  onChange={(e) => setMission(e.target.value)}
                />
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>Facebook page</lable>
              </Grid>
              <Grid item xs={7}>
                <input
                  defaultValue={data.faceBookLink}
                  type="text"
                  onChange={handleFaceBookChange}
                />{" "}
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>Intergramme page</lable>
              </Grid>
              <Grid item xs={7}>
                <input
                  defaultValue={data.instergrameLink}
                  type="text"
                  onChange={(e) => setInstergrameLink(e.target.value)}
                />{" "}
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>BsWhatsapp</lable>
              </Grid>
              <Grid item xs={7}>
                <input
                  defaultValue={data.whatsappLink}
                  type="text"
                  onChange={(e) => setWhatsappLink(e.target.value)}
                />{" "}
              </Grid>
              <br />
              <Grid item xs={2.7}>
                <lable>community Email</lable>
              </Grid>
              <Grid item xs={7}>
                <input
                  defaultValue={data.email}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </Grid>
              <br />
              <Grid item xs={3}>
                <lable>Change logo picture</lable>
              </Grid>
              <Grid item xs={7}>
                <input type="file" onChange={logoChangeHandler} />{" "}
                <label>
                  {Object.keys(logoERR).map((key) => {
                    return <div style={{ color: "red" }}>{logoERR[key]}</div>;
                  })}{" "}
                </label>
              </Grid>
              <br />
              <Grid item xs={3}>
                <lable>Change cover picture</lable>
              </Grid>
              <Grid item xs={7}>
                <input type="file" onChange={coverChangeHandler} />{" "}
                <label>
                  {Object.keys(coverERR).map((key) => {
                    return <div style={{ color: "red" }}>{coverERR[key]}</div>;
                  })}{" "}
                </label>
              </Grid>
            </Grid>
          );
        })}
      </form>
      <Box m="20px">
        <button className="acceptMember" onClick={sendData}>
          Update details
        </button>
      </Box>
    </Model>
  );
};

export default UpdateModal;
