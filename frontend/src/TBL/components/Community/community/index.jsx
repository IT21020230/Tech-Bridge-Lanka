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
import UpdateQuestionModal from "./updateQuestion";
import UserQuestionModal from "./userQuestionForm";
import UserAnswerModal from "./userAnswerForm";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  const lowercaseQuery = query.toLowerCase();
  return items.filter((data) =>
    data.memberName.toLowerCase().includes(lowercaseQuery)
  );
};

export default function () {
  const [visible, setVisible] = useState(false);
  const [Form1, setForm1] = useState(false);
  const [Form2, setForm2] = useState(false);
  const [Form3, setForm3] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [comData, setComData] = useState([]);
  const [comRules, setComRules] = useState([]);
  const [comQuestions, setComQuestions] = useState([]);
  const [comRequest, setComRequest] = useState([]);
  const [tab, setTab] = useState("home");
  const [rule, setRule] = useState("");
  const [question, setComQuestion] = useState("");
  const [count, setCount] = useState(0);
  const { user } = useAuthContext();

  const UID = user.userId;

  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(comData);
  const { id } = useParams();
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(id);
  const popover = (id, role) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>
          <Grid container spacing={1}>
            {role != "admin" ? (
              <Grid item xs={12}>
                <button
                  className="inBTN"
                  onClick={(e) => {
                    setAsAdmin(id);
                  }}
                >
                  Make as Admin
                </button>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <button
                  className="inBTN"
                  onClick={(e) => {
                    dismissAsAdmin(id);
                  }}
                >
                  Dismiss as Admin
                </button>
              </Grid>
            )}

            <Grid item xs={12}>
              <button
                className="inBTN"
                onClick={(e) => {
                  removeMember(id);
                }}
              >
                {" "}
                remove from community
              </button>
            </Grid>
          </Grid>
        </Popover.Body>
      </Popover>
    );
  };

  const setAsAdmin = (ID) => {
    axios
      .patch(`/api/communityMember/changeRoll/${ID}`, {
        role: "admin",
      })
      .then((response) => {
        toast.success(`Roll changed successfully `, {
          position: "bottom-left",
        });
        setTimeout(() => {
          window.location.href = `/community/${id}`;
        }, 2000);
      });
  };

  const dismissAsAdmin = (ID) => {
    axios
      .patch(`/api/communityMember/changeRoll/${ID}`, {
        role: "member",
      })
      .then((response) => {
        toast.success(`Roll changed successfully`, {
          position: "bottom-left",
        });
        setTimeout(() => {
          window.location.href = `/community/${id}`;
        }, 2000);
      });
  };

  const removeMember = (ID) => {
    axios.delete(`/api/communityMember/removeMember/${ID}`).then((response) => {
      toast.success(`Member is removed `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.href = `/community/${id}`;
      }, 2000);
    });
  };

  useEffect(() => {
    axios.get(`/api/community/getCommunity/${id}`).then((response) => {
      setComData(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/communityRule/getAllRules/${id}`).then((response) => {
      setComRules(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/communityQuestion/getAllQuestion/${id}`)
      .then((response) => {
        setComQuestions(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`/api/communityAnswer/getRequest/${id}`).then((response) => {
      setComRequest(response.data);
    });
  }, []);
  const [currentRole, setCurrentRole] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/communityMember/getOneMember/${UID}/${id}`)
      .then((response) => {
        if (response.data.length != 0) {
          setCurrentRole(response.data[0].role);
        } else {
          axios
            .get(`/api/communityAnswer/getOneMember/${UID}/${id}`)
            .then((response) => {
              if (response.data.length != 0) {
                setCurrentRole("pending");
              } else {
                setCurrentRole("guest");
              }
            });
        }
      });
  }, []);

  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  console.log(currentRole);

  const [memberList, setMemberList] = useState([]);

  const [query, setQuery] = useState("");

  const filteredItems = getFilteredItems(query, memberList);

  useEffect(() => {
    axios.get(`/api/communityMember/getMembers/${id}`).then((response) => {
      setMemberList(response.data);
      console.log(response.data);
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
  const [userAnswerFormOpen, setAnswerFormOpen] = useState(false);
  const [updateRuleFormOpen, setUpdateRuleFormOpen] = useState(false);
  const [updateQuestionFormOpen, setUpdateQuestionFormOpen] = useState(false);
  const [ruleId, setRuleID] = useState();
  const [ruleOne, setRuleOne] = useState();

  const [questionId, setQuestionID] = useState();
  const [questionOne, setQuestionOne] = useState();

  const [answerData, setQAnswerData] = useState();

  const handleOpenModal = () => {
    setUpdateFormOpen(true);
  };

  const handleCloseModal2 = () => {
    setVisible(false);
  };

  const handleCloseModal = () => {
    setUpdateFormOpen(false);
  };

  const handleOpenRuleModal = (id, rule) => {
    setUpdateRuleFormOpen(true);
    setRuleID(id);
    setRuleOne(rule);
  };

  const handleCloseRuleModal = () => {
    setUpdateRuleFormOpen(false);
    setRuleID("");
    // window.location.href = `/community/${id}`;
  };

  const userAnswerOpen = (data) => {
    setQAnswerData(data);
    setAnswerFormOpen(true);
  };
  const userAnswerClose = () => {
    setAnswerFormOpen(false);
  };

  const handleOpenQuestionModal = (id, question) => {
    console.log(
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
    );
    console.log(question);
    setUpdateQuestionFormOpen(true);
    setQuestionID(id);
    setQuestionOne(question);
  };

  const handleCloseQuestionModal = () => {
    setUpdateQuestionFormOpen(false);
    setQuestionID("");
    // window.location.href = `/community/${id}`;
  };

  const delteRule = async (Ruleid) => {
    await axios.delete(`/api/communityRule/deleteRule/${Ruleid}`);

    toast.success(`Rule deleted `, {
      position: "bottom-left",
    });
    setTimeout(() => {
      window.location.href = `/community/${id}`;
    }, 1000);
  };

  const delteQuestion = async (Questionid) => {
    await axios.delete(`/api/communityQuestion/deleteQuestion/${Questionid}`);
    toast.success(`Question deleted `, {
      position: "bottom-left",
    });
    setTimeout(() => {
      window.location.href = `/community/${id}`;
    }, 1000);
  };
  const sendData = async (id) => {
    await axios.post("/api/communityRule/createRule", {
      commID: id,
      rule,
    });

    toast.success(`Rule added successfully`, {
      position: "bottom-left",
    });
    setTimeout(() => {
      window.location.href = `/community/${id}`;
    }, 1000);
  };
  const sendQuestinData = async (id) => {
    await axios.post("/api/communityQuestion/createQuestion", {
      commID: id,
      question,
    });
    toast.success(`Rule added successfully`, {
      position: "bottom-left",
    });
    setTimeout(() => {
      window.location.href = `/community/${id}`;
    }, 1000);
  };
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <ToastContainer />
      <UpdateModal
        isOpen={updateFormOpen}
        onRequestClose={handleCloseModal}
        comData={id}
      />

      <UserAnswerModal
        isOpen={userAnswerFormOpen}
        onRequestClose={userAnswerClose}
        communityID={id}
        answerData={answerData}
      />

      <UserQuestionModal
        isOpen={visible}
        onRequestClose={handleCloseModal2}
        communityID={id}
        userID={UID}
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
        isOpen={Form3}
        onRequestClose={() => setForm3(false)}
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
        <lable>Enter the Question</lable>
        <textarea
          id="myTextArea"
          rows="4"
          cols="40"
          placeholder="Enter your text here..."
          onChange={(e) => setComQuestion(e.target.value)}
        />
        <Box m="20px">
          <button
            className="acceptMember"
            onClick={() => {
              sendQuestinData(id);
            }}
          >
            Submit
          </button>
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
                    {currentRole == "guest" ? (
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
                    ) : (
                      <></>
                    )}
                    {currentRole == "pending" ? (
                      <div style={{ textAlign: "right" }}>
                        <button
                          className="joinBtn"
                          onClick={() => setVisible(true)}
                          disabled
                        >
                          <MdConnectWithoutContact
                            style={{ marginRight: "10px" }}
                          />
                          Request sent
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
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
                            {memberList.slice(0, 6).map((data2) => {
                              return (
                                <>
                                  <Grid item xs={4}>
                                    <div className="memberList">
                                      <img
                                        src={data2.proPic}
                                        className="proPic"
                                      />

                                      <p>{data2.memberName} </p>
                                    </div>
                                  </Grid>
                                </>
                              );
                            })}
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
                                <p className="ln2"> View Event</p>
                              </button>
                              <button className="createProject">
                                <p className="ln3">
                                  <AiOutlineFundProjectionScreen />
                                </p>
                                <p className="ln4">View Project</p>
                              </button>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div
                              className="options"
                              style={{ marginTop: "-20px" }}
                            >
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
                                  {data.whatsappLink == null &&
                                  currentRole == "admin" ? (
                                    <h9 style={{ color: "red" }}>
                                      Complete your community Page...
                                    </h9>
                                  ) : (
                                    <>...see community about info</>
                                  )}
                                </h6>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12}></Grid>
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
                          {data.vission == null && currentRole == "admin" ? (
                            <h9 style={{ color: "red" }}>
                              Complete your community page.....
                            </h9>
                          ) : (
                            <>
                              {" "}
                              <p>{data.vission}</p>
                            </>
                          )}
                        </div>
                        <div className="promt">
                          <h4 className="memberTitile">Our Misson</h4>
                          {data.Mission == null && currentRole == "admin" ? (
                            <h9 style={{ color: "red" }}>
                              Complete your community page.....
                            </h9>
                          ) : (
                            <>
                              {" "}
                              <p>{data.Mission}</p>
                            </>
                          )}
                        </div>
                      </Grid>
                    );
                  })}
                  {/* <Grid item xs={6}>
                    <div className="displayRule" style={{ marginTop: "20px" }}>
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
                  </Grid> */}
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
                  {currentRole == "admin" ? (
                    <button className="editAbout" onClick={handleOpenModal}>
                      <FaRegEdit />
                    </button>
                  ) : (
                    <></>
                  )}
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
                                <UpdateRuleModal
                                  isOpen={updateRuleFormOpen}
                                  onRequestClose={handleCloseRuleModal}
                                  comData={ruleId}
                                  comRule={ruleOne}
                                  id={id}
                                />
                                {currentRole == "admin" ? (
                                  <>
                                    <button
                                      className="editBtn"
                                      onClick={() => {
                                        handleOpenRuleModal(
                                          data._id,
                                          data.rule
                                        );
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
                                  </>
                                ) : (
                                  <></>
                                )}
                              </li>
                            </div>
                          );
                        })}
                      </ol>

                      {currentRole == "admin" ? (
                        <button
                          className="addRuleBtn"
                          onClick={() => setForm2(true)}
                        >
                          Add new Rule
                        </button>
                      ) : (
                        <></>
                      )}
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
                      <div style={{ position: "relative", marginTop: "20px" }}>
                        <label
                          htmlFor="myInput"
                          style={{
                            fontStyle: "italic",
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none", // Ensures the label doesn't interfere with input interaction
                            marginTop: "10px",
                          }}
                        >
                          <AiOutlineSearch />
                        </label>
                        <input
                          type="text"
                          id="myInput"
                          placeholder="search community here"
                          style={{
                            paddingLeft: "30px",
                            width: "220px",
                            borderRadius: "50px",
                            marginTop: "20px",
                          }}
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </div>
                <Grid container spacing={2}>
                  {filteredItems.map((data) => {
                    return (
                      <>
                        {" "}
                        <Grid item xs={6}>
                          <div className="oneMember">
                            <Grid container spacing={0}>
                              <Grid item xs={3}>
                                <img
                                  className="memberList1"
                                  src={data.proPic}
                                />
                              </Grid>
                              <Grid item xs={8}>
                                <p className="oneName">{data.memberName}</p>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                  }}
                                >
                                  {data.role}
                                </p>
                              </Grid>
                              <Grid item xs={1}>
                                {currentRole == "admin" &&
                                data.userID !== UID ? (
                                  <OverlayTrigger
                                    trigger="click"
                                    placement="right"
                                    overlay={popover(data._id, data.role)}
                                  >
                                    <button
                                      variant="success"
                                      className="optionBTN"
                                    >
                                      :
                                    </button>
                                  </OverlayTrigger>
                                ) : (
                                  <></>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>{" "}
                      </>
                    );
                  })}
                </Grid>
              </div>
            </Tab>
            {currentRole == "admin" ? (
              <Tab eventKey="Question Form" title="Question Form">
                <div style={{ minHeight: "500px" }}>
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
                            {comQuestions.map((data) => {
                              return (
                                <div>
                                  <li>
                                    {data.question}
                                    <br />
                                    <div></div>
                                    <UpdateQuestionModal
                                      isOpen={updateQuestionFormOpen}
                                      onRequestClose={handleCloseQuestionModal}
                                      comQuestionData={questionOne}
                                      comQuestionID={questionId}
                                      id={id}
                                    />
                                    <button
                                      className="editBtn"
                                      onClick={() => {
                                        handleOpenQuestionModal(
                                          data._id,
                                          data.question
                                        );
                                      }}
                                    >
                                      <AiOutlineEdit />
                                    </button>
                                    <button
                                      className="delteBtn"
                                      onClick={() => {
                                        delteQuestion(data._id);
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
                            onClick={() => setForm3(true)}
                          >
                            Add new Question
                          </button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Tab>
            ) : (
              <></>
            )}
            {currentRole == "admin" ? (
              <Tab eventKey="Member Requst" title="Member request">
                <div className="CommunityMember" style={{ minHeight: "500px" }}>
                  <Grid container spacing={2}>
                    {" "}
                    {comRequest.length != 0 ? (
                      <>
                        {" "}
                        {comRequest.map((data) => {
                          return (
                            <Grid item xs={6}>
                              <div className="oneMember">
                                <Grid container spacing={0}>
                                  <Grid item xs={3}>
                                    <img
                                      className="memberList1"
                                      src={data.proPic}
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <p className="oneName">{data.userName}</p>
                                  </Grid>
                                  <Grid item xs={3}>
                                    <button
                                      variant="success"
                                      className="addRuleBtn"
                                      style={{ marginTop: "10px" }}
                                      onClick={() => {
                                        userAnswerOpen(data);
                                      }}
                                    >
                                      View form
                                    </button>
                                  </Grid>
                                </Grid>
                              </div>
                            </Grid>
                          );
                        })}
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "150px",
                          marginRight: "50%",
                        }}
                      >
                        No member requests found.
                      </div>
                    )}
                  </Grid>
                </div>
              </Tab>
            ) : (
              <></>
            )}
          </Tabs>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
