import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import tempCover from "../../../assets/CC.jpg";
import tempLogo from "../../../assets/AA.png";
import p01 from "../../../assets/p01.jpg";
import p02 from "../../../assets/p02.jpg";
import p03 from "../../../assets/p03.jpg";
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
import Table from "react-bootstrap/Table";
import Model from "react-modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { BiBorderRadius } from "react-icons/bi";
import { MdOutlineEventNote } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineGroups2 } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrash } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UpdateModal from "./updateModal";
import UpdateRuleModal from "./updateRule";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";

export default function () {
  const [visible, setVisible] = useState(false);
  const [Form1, setForm1] = useState(false);
  const [Form2, setForm2] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [comData, setComData] = useState([]);
  const [comRules, setComRules] = useState([]);
  const [tab, setTab] = useState("home");
  const [rule, setRule] = useState("");
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(comData);
  const { id } = useParams();
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(id);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <button className="inBTN">set as admin</button>
          </Grid>
          <Grid item xs={12}>
            <button className="inBTN">remove from community</button>
          </Grid>
        </Grid>
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/community/getCommunity/${id}`)
      .then((response) => {
        setComData(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/communityRule/getAllRules/${id}`)
      .then((response) => {
        setComRules(response.data);
      });
  }, []);
  const { Formik } = formik;
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");

  const schema = yup.object().shape({
    communityName: yup.string().required("Community name required"),
    Location: yup
      .string()
      .required("Location required")
      .matches(/^[A-Za-z ]*$/, "Location must contain only letters"),
    email: yup
      .string()
      .required("Email required")
      .email("Invalid email format"),

    date: yup
      .date()
      .required("Location is required")

      .max(new Date(), "Date cannot be in the future"),
    logo: yup.mixed().required("Please select a file"),

    contactNumber: yup
      .string()
      .required("contact number required")
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be a 10-digit number without spaces or dashes"
      ),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    communitySize: yup.string().required("Community size is required"),
  });
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateRuleFormOpen, setUpdateRuleFormOpen] = useState(false);
  const [ruleId, setRuleID] = useState();

  const handleOpenModal = () => {
    setUpdateFormOpen(true);
  };

  const handleCloseModal = () => {
    setUpdateFormOpen(false);
  };

  const handleOpenRuleModal = (id) => {
    setUpdateRuleFormOpen(true);
    setRuleID(id);
  };

  const handleCloseRuleModal = () => {
    setUpdateRuleFormOpen(false);
  };

  const delteRule = async (Ruleid) => {
    await axios.delete(
      `http://localhost:8080/api/communityRule/deleteRule/${Ruleid}`
    );
    window.location.href = `/community/${id}`;
  };
  const sendData = async (id) => {
    await axios.post("http://localhost:8080/api/communityRule/createRule", {
      commID: id,
      rule,
    });
    window.location.href = `/community/${id}`;
  };
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <UpdateModal
        isOpen={updateFormOpen}
        onRequestClose={handleCloseModal}
        comData={id}
      />
      <UpdateRuleModal
        isOpen={updateRuleFormOpen}
        onRequestClose={handleCloseRuleModal}
        comData={ruleId}
      />
      <Model
        isOpen={Form2}
        onRequestClose={() => setForm2(false)}
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
        <lable>Enter the Rule</lable>
        <textarea
          id="myTextArea"
          rows="4"
          cols="40"
          placeholder="Enter your text here..."
          onChange={(e) => setRule(e.target.value)}
        />
        <Box m="20px">
          <button
            className="acceptMember"
            onClick={() => {
              sendData(id);
            }}
          >
            Submit
          </button>
        </Box>
      </Model>
      <Model
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
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
            <Formik
              validationSchema={schema}
              validateOnChange={false} // Disable validation on change
              validateOnBlur={true} // Enable validation on blur
              onSubmit={console.log}
              initialValues={{
                communityName: "",

                terms: false,
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="5"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label style={{ marginTop: "20px" }}>
                        1 . How diverse and inclusive is the community and Do
                        you actively promote inclusivity and equality?
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          name="communityName"
                          value={values.communityName}
                          onChange={handleChange}
                          isValid={
                            touched.communityName && !errors.communityName
                          }
                          isInvalid={!!errors.communityName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.communityName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="5"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label style={{ marginTop: "20px" }}>
                        2. What resources or support systems are available
                        within the community for members?
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          name="communityName"
                          value={values.communityName}
                          onChange={handleChange}
                          isValid={
                            touched.communityName && !errors.communityName
                          }
                          isInvalid={!!errors.communityName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.communityName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="5"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label style={{ marginTop: "20px" }}>
                        3. Can you share testimonials or stories from current
                        members about their experiences in the community?
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          name="communityName"
                          value={values.communityName}
                          onChange={handleChange}
                          isValid={
                            touched.communityName && !errors.communityName
                          }
                          isInvalid={!!errors.communityName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.communityName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="5"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label style={{ marginTop: "20px" }}>
                        4. What are some of the challenges or obstacles the
                        community has faced, and how have you overcome them?
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          name="communityName"
                          value={values.communityName}
                          onChange={handleChange}
                          isValid={
                            touched.communityName && !errors.communityName
                          }
                          isInvalid={!!errors.communityName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.communityName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Button className="submitBTN" type="submit">
                    Submit form
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Model>
      <Model
        isOpen={Form1}
        onRequestClose={() => setForm1(false)}
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
        </div>
        <ol>
          <li>
            How diverse and inclusive is the community and Do you actively
            promote inclusivity and equality?
            <p style={{ margin: "10px" }}>Answer :- aaaaaaaaaaaaaaaaaaaaaa</p>
          </li>
          <li>
            {" "}
            What resources or support systems are available within the community
            for members?
            <p style={{ margin: "10px" }}>Answer :- aaaaaaaaaaaaaaaaaaaaaa</p>
          </li>
          <li>
            {" "}
            Can you share testimonials or stories from current members about
            their experiences in the community?
            <p style={{ margin: "10px" }}>Answer :- aaaaaaaaaaaaaaaaaaaaaa</p>
          </li>
          <li>
            {" "}
            What are some of the challenges or obstacles the community has
            faced, and how have you overcome them?
            <p style={{ margin: "10px" }}>Answer :- aaaaaaaaaaaaaaaaaaaaaa</p>
          </li>
        </ol>
        <Box m="20px">
          <button className="acceptMember">Accept</button>
          <button className="rejectMember">Reject</button>
        </Box>
      </Model>

      {comData.map((data) => {
        console.log(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        console.log(data);
        return (
          <div>
            <div>
              {" "}
              <Card
                style={{ backgroundColor: "#F0F2F5", paddingBottom: "80px" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <img
                          className="coverPic"
                          src={require(`../createCommunity/communityCover/${data.coverPic}`)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          className="logoPic"
                          src={require(`../createCommunity/communityLogo/${data.logo}`)}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <h1 className="pageHeading">{data.commName}</h1>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ textAlign: "right" }}>
                      <button
                        className="joinBtn"
                        onClick={() => setVisible(true)}
                      >
                        <MdConnectWithoutContact
                          style={{ marginRight: "10px" }}
                        />
                        Join with us
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </div>
        );
      })}
      <div></div>

      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Tabs
            defaultActiveKey={tab}
            id="justify-tab-example"
            className="mb-1"
            justify
          >
            <Tab eventKey="home" title="Home">
              <Card
                style={{
                  backgroundColor: "#F0F2F5",
                  padding: "10px",
                  paddingBottom: "200px",
                }}
              >
                <Grid container spacing={2}>
                  {comData.map((data) => {
                    console.log(
                      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    );
                    console.log(data);
                    return (
                      <Grid item xs={6}>
                        <div className="lB">
                          <h4 className="memberTitile">Community member</h4>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p01} className="proPic" />

                                <p>Jhon de silva</p>
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p02} className="proPic" />

                                <p>S.N.W Gunasekara</p>
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p03} className="proPic" />

                                <p>W.A Alwis</p>
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p03} className="proPic" />

                                <p>Jerms Proyantha</p>
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p03} className="proPic" />

                                <p>A.S Gunarathna</p>
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div className="memberList">
                                <img src={p03} className="proPic" />

                                <p>W.P Kavish</p>
                              </div>
                            </Grid>
                          </Grid>
                          <button className="memberBTN">
                            View All members
                          </button>
                        </div>
                      </Grid>
                    );
                  })}
                  {comData.map((data) => {
                    console.log(
                      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    );
                    console.log(data);
                    return (
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <div className="options">
                              <button className="createEvent">
                                <p className="ln1">
                                  <MdOutlineEventNote />
                                </p>
                                <p className="ln2"> Create Event</p>
                              </button>
                              <button className="createProject">
                                <p className="ln3">
                                  <AiOutlineFundProjectionScreen />
                                </p>
                                <p className="ln4">Start Project</p>
                              </button>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div className="data">
                              <h4 className="memberTitile">
                                Community details
                              </h4>
                              <div className="dataIn">
                                <h6 className="aboutData">
                                  <IoLocationOutline /> {data.location}
                                </h6>
                                <h6 className="aboutData">
                                  <MdOutlineGroups2 /> {data.size} members
                                </h6>
                                <h6 className="aboutData">
                                  <MdDateRange /> Founding Date{" "}
                                  {data.startedDate}
                                </h6>
                                <h6 className="aboutData">
                                  <ImFacebook2 />{" "}
                                  <a href={data.faceBookLink}>
                                    {data.faceBookLink}
                                  </a>
                                </h6>
                                <h6 className="aboutData">
                                  <FaInstagram />{" "}
                                  <a href={data.instergrameLink}>
                                    {" "}
                                    {data.instergrameLink}{" "}
                                  </a>
                                </h6>
                                <h6 className="aboutData">
                                  <BsWhatsapp />{" "}
                                  <a href={data.whatsappLink}>
                                    {" "}
                                    {data.whatsappLink}
                                  </a>
                                </h6>
                                <h6
                                  className="aboutData"
                                  onClick={() => {
                                    setTab("About us");
                                  }}
                                >
                                  ...see community about info
                                </h6>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                  {comData.map((data) => {
                    console.log(
                      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    );
                    console.log(data);
                    return (
                      <Grid item xs={6}>
                        <div className="promt">
                          <h4 className="memberTitile">Our Vission</h4>
                          <p>{data.vission}</p>
                        </div>
                        <div className="promt">
                          <h4 className="memberTitile">Our Misson</h4>
                          <p>{data.Mission}</p>
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={6}>
                    <div className="displayRule">
                      <h4 className="memberTitile">Community Rules</h4>
                      <ul>
                        {comRules.map((data) => {
                          return (
                            <div>
                              <li>{data.rule}</li>
                            </div>
                          );
                        })}

                        <br />
                        <button className="abt">
                          ...visit community rules
                        </button>
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Tab>
            <Tab eventKey="About us" title="About us">
              <Grid container spacing={0}>
                <Grid item xs={2.5}></Grid>

                <Grid item xs={7}>
                  {comData.map((data) => {
                    return (
                      <div className="aboutUsPaage">
                        <h4>
                          <b>
                            <u>General</u>
                          </b>
                        </h4>
                        <div className="spacer">
                          <Typography
                            style={{ display: "inline" }}
                            variant="h7"
                            fontWeight="400"
                          >
                            Community Name :
                          </Typography>
                          {"  "}
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.commName}
                          </Typography>
                        </div>
                        <div className="spacer">
                          <Typography
                            style={{ display: "inline" }}
                            variant="h7"
                            fontWeight="400"
                          >
                            Location :
                          </Typography>
                          {"  "}
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.location}
                          </Typography>
                        </div>
                        <div className="spacer">
                          <Typography
                            style={{ display: "inline" }}
                            variant="h7"
                            fontWeight="400"
                          >
                            Started Date :
                          </Typography>
                          {"  "}
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.startedDate}
                          </Typography>
                        </div>
                        <div className="spacer">
                          <Typography
                            style={{ display: "inline" }}
                            variant="h7"
                            fontWeight="400"
                          >
                            Community Size :
                          </Typography>
                          {"  "}
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.size} Members
                          </Typography>
                        </div>
                        <h4 style={{ marginTop: "10px" }}>
                          <b>
                            <u>Vission</u>
                          </b>
                        </h4>
                        <div className="spacer">
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.vission}
                          </Typography>
                        </div>
                        <h4 style={{ marginTop: "10px" }}>
                          <b>
                            <u>Mission</u>
                          </b>
                        </h4>
                        <div className="spacer">
                          <Typography
                            variant="h7"
                            style={{ display: "inline" }}
                          >
                            {data.Mission}
                          </Typography>
                        </div>
                        <h4 style={{ marginTop: "10px" }}>
                          <b>
                            <u>Contact Us</u>
                          </b>
                        </h4>
                        <div className="spacer">
                          <h6 className="aboutData">
                            <ImFacebook2 />{" "}
                            <a href={data.faceBookLink}>{data.faceBookLink}</a>
                          </h6>
                          <h6 className="aboutData">
                            <FaInstagram />{" "}
                            <a href={data.instergrameLink}>
                              {" "}
                              {data.instergrameLink}{" "}
                            </a>
                          </h6>
                          <h6 className="aboutData">
                            <BsWhatsapp />{" "}
                            <a href={data.whatsappLink}> {data.whatsappLink}</a>
                          </h6>
                          <h6 className="aboutData">
                            <SiGmail /> <a href={data.email}> {data.email}</a>
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={2.5}>
                  <button className="editAbout" onClick={handleOpenModal}>
                    <FaRegEdit />
                  </button>
                </Grid>
              </Grid>
            </Tab>
            <Tab eventKey="Community Rules" title="Community Rules">
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <div className="rules">
                    <h2>
                      <u>
                        <b>Community Rules</b>
                      </u>
                    </h2>
                    <div className="rulesList">
                      <ol>
                        {comRules.map((data) => {
                          return (
                            <div>
                              <li>
                                {data.rule}
                                <br />
                                <div></div>
                                <button
                                  className="editBtn"
                                  onClick={() => {
                                    handleOpenRuleModal(data._id);
                                  }}
                                >
                                  <AiOutlineEdit />
                                </button>
                                <button
                                  className="delteBtn"
                                  onClick={() => {
                                    delteRule(data._id);
                                  }}
                                >
                                  <IoTrash />
                                </button>
                              </li>
                            </div>
                          );
                        })}
                      </ol>
                      <button
                        className="addRuleBtn"
                        onClick={() => setForm2(true)}
                      >
                        Add new Rule
                      </button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Tab>
            <Tab eventKey="Community members" title="Members">
              <div className="CommunityMember">
                <div className="memberOption">
                  <Grid container spacing={0}>
                    <Grid item xs={10}>
                      <div style={{ position: "relative" }}>
                        <label
                          htmlFor="myInput"
                          style={{
                            fontStyle: "italic",
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none", // Ensures the label doesn't interfere with input interaction
                          }}
                        >
                          <AiOutlineSearch /> Search member here...
                        </label>
                        <input
                          type="text"
                          id="myInput"
                          style={{
                            paddingLeft: "30px",
                            width: "220px",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <button className="invite">+ Invite members</button>
                    </Grid>
                  </Grid>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p01} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">Jhon de silva</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p02} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">S.N.W Gunasekara</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p03} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">W.A Alwis</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p03} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">Jerms Proyantha</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p03} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">A.S Gunarathna</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <div className="oneMember">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <img className="memberList1" src={p03} />
                        </Grid>
                        <Grid item xs={8}>
                          <p className="oneName">W.P Kavish</p>
                        </Grid>
                        <Grid item xs={1}>
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={popover}
                          >
                            <button variant="success" className="optionBTN">
                              :
                            </button>
                          </OverlayTrigger>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>{" "}
                </Grid>
              </div>
            </Tab>
            <Tab eventKey="Question Form" title="Question Form">
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <div className="rules">
                    <h2>
                      <u>
                        <b>Question form </b>
                      </u>
                    </h2>
                    <div className="rulesList">
                      <ol>
                        <li>
                          How diverse and inclusive is the community? Do you
                          actively promote inclusivity and equality?
                          <br />
                          <div></div>
                          <button className="editBtn">
                            <AiOutlineEdit />
                          </button>
                          <button className="delteBtn">
                            <IoTrash />
                          </button>
                        </li>
                        <li>
                          What resources or support systems are available within
                          the community for members?
                          <br />
                          <div></div>
                          <button className="editBtn">
                            <AiOutlineEdit />
                          </button>
                          <button className="delteBtn">
                            <IoTrash />
                          </button>
                        </li>
                        <li>
                          Can you share testimonials or stories from current
                          members about their experiences in the community?
                          <br />
                          <div></div>
                          <button className="editBtn">
                            <AiOutlineEdit />
                          </button>
                          <button className="delteBtn">
                            <IoTrash />
                          </button>
                        </li>
                        <li>
                          What are some of the challenges or obstacles the
                          community has faced, and how have you overcome them?
                          <br />
                          <div></div>
                          <button className="editBtn">
                            <AiOutlineEdit />
                          </button>
                          <button className="delteBtn">
                            <IoTrash />
                          </button>
                        </li>
                      </ol>
                      <button className="addRuleBtn">Add new Question</button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Tab>
            <Tab eventKey="Member Requst" title="Member request">
              <div className="CommunityMember">
                {" "}
                <Table striped="columns">
                  <tbody>
                    <tr>
                      <td>U01</td>
                      <td>Shehan</td>
                      <td>Kiribathgoda</td>
                      <td>
                        <button
                          className="viewBtn"
                          onClick={() => setForm1(true)}
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>U01</td>
                      <td>Shehan</td>
                      <td>Kiribathgoda</td>
                      <td>
                        <button
                          className="viewBtn"
                          onClick={() => setForm1(true)}
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>U01</td>
                      <td>Shehan</td>
                      <td>Kiribathgoda</td>
                      <td>
                        <button
                          className="viewBtn"
                          onClick={() => setForm1(true)}
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>U01</td>
                      <td>Shehan</td>
                      <td>Kiribathgoda</td>
                      <td>
                        <button
                          className="viewBtn"
                          onClick={() => setForm1(true)}
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
