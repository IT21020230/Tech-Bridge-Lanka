import React, { Component } from "react";
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

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function () {
  const [visible, setVisible] = useState(false);
  const [Form1, setForm1] = useState(false);

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

  const { Formik } = formik;

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

  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
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
      <Card style={{ backgroundColor: "#F0F2F5", paddingBottom: "80px" }}>
        <Grid container spacing={0}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <img className="coverPic" src={tempCover} />
              </Grid>
              <Grid item xs={3}>
                <img className="logoPic" src={tempLogo} />
              </Grid>
              <Grid item xs={9}>
                <h1 className="pageHeading">Leo Club SLIIT</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <div style={{ textAlign: "right" }}>
              <button className="joinBtn" onClick={() => setVisible(true)}>
                <MdConnectWithoutContact style={{ marginRight: "10px" }} />
                Join with us
              </button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Tabs
            defaultActiveKey="Community members"
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
                  <Grid item xs={6}>
                    <div className="lB">
                      <h4 className="memberTitile">Community member</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p01} className="proPic" />
                            <p>President</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p02} className="proPic" />
                            <p>Vice President</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p03} className="proPic" />
                            <p>Secretary</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p03} className="proPic" />
                            <p>Secretary</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p03} className="proPic" />
                            <p>Secretary</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="memberList">
                            <img src={p03} className="proPic" />
                            <p>Secretary</p>
                            <p>Jhon de silva</p>
                          </div>
                        </Grid>
                      </Grid>
                      <button className="memberBTN">View All members</button>
                    </div>
                  </Grid>
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
                          <h4 className="memberTitile">Community details</h4>
                          <div className="dataIn">
                            <h6 className="aboutData">
                              <IoLocationOutline /> Colombo , Sri Lanka
                            </h6>
                            <h6 className="aboutData">
                              <MdOutlineGroups2 /> Large (0-200) Community
                            </h6>
                            <h6 className="aboutData">
                              <MdDateRange /> Founding Date "2019/02/15"
                            </h6>
                            <h6 className="aboutData">
                              <ImFacebook2 /> Leo Club of SLIIT
                            </h6>
                            <h6 className="aboutData">
                              <FaInstagram /> _Leo_Club_SLIIT
                            </h6>
                            <h6 className="aboutData">
                              <BsWhatsapp /> 0763689506
                            </h6>
                            <h6 className="aboutData">
                              <button className="abt">
                                ...see community about info
                              </button>
                            </h6>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="promt">
                      <h4 className="memberTitile">Our Vission</h4>
                      <p>
                        Empowering society through compassion and support.
                        Creating a community that uplifts and assists
                        individuals. Promoting equality, justice, and empathy
                        for a brighter future. Social Help Club: Making a
                        difference together.
                      </p>
                    </div>
                    <div className="promt">
                      <h4 className="memberTitile">Our Misson</h4>
                      <p>
                        Our mission is to create a vibrant and inclusive social
                        community that empowers individuals to connect, support,
                        and inspire one another. Through fostering meaningful
                        relationships and promoting collaboration, we aim to
                        address social challenges, celebrate diversity, and
                        drive positive change. By providing a platform for open
                        dialogue, personal growth, and collective learning, our
                        community endeavors to create a better world where
                        compassion, understanding, and equality thrive.
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="displayRule">
                      <h4 className="memberTitile">Community Rules</h4>
                      <ul>
                        <li>
                          Treat all members with respect and kindness: In our
                          community, we prioritize treating all members with
                          respect and kindness. We believe in fostering a
                          positive and inclusive atmosphere where everyone feels
                          valued and appreciated. We encourage the use of polite
                          and considerate language, and we value diverse
                          opinions and perspectives. By showing empathy and
                          understanding towards one another, we can create a
                          supportive environment for personal growth and
                          meaningful connections.
                        </li>
                        <li>
                          Foster an inclusive and welcoming environment for
                          everyone: Our community is built upon the principles
                          of inclusivity and acceptance. We strive to create a
                          space that welcomes individuals from all backgrounds,
                          cultures, and identities. By embracing diversity and
                          actively seeking different perspectives, we can
                          cultivate an enriching environment where everyone
                          feels safe to express themselves authentically. We
                          encourage collaboration and aim to build bridges that
                          connect people from various walks of life.
                        </li>
                        <li>
                          Engage in constructive and respectful discussions:
                          Open and respectful communication is the cornerstone
                          of our community. We encourage members to engage in
                          discussions that are constructive, where differing
                          opinions can be expressed and debated in a respectful
                          manner. Active listening and thoughtful responses are
                          crucial in fostering understanding and finding common
                          ground. We value the exchange of ideas and believe
                          that respectful dialogue contributes to personal
                          growth and collective learning.
                        </li>

                        <li>
                          Seek permission before sharing personal information or
                          content.
                        </li>
                        <br />
                        <button className="abt">...see community Ruless</button>
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
                      <Typography variant="h7" style={{ display: "inline" }}>
                        Leo Club Sliit
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
                      <Typography variant="h7" style={{ display: "inline" }}>
                        Colombo Sri Lanka
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
                      <Typography variant="h7" style={{ display: "inline" }}>
                        2019/01/14
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
                      <Typography variant="h7" style={{ display: "inline" }}>
                        Large(0-20) Community
                      </Typography>
                    </div>
                    <h4 style={{ marginTop: "10px" }}>
                      <b>
                        <u>Vission</u>
                      </b>
                    </h4>
                    <div className="spacer">
                      <Typography variant="h7" style={{ display: "inline" }}>
                        Empowering society through compassion and support.
                        Creating a community that uplifts and assists
                        individuals. Promoting equality, justice, and empathy
                        for a brighter future. Social Help Club: Making a
                        difference together.
                      </Typography>
                    </div>
                    <h4 style={{ marginTop: "10px" }}>
                      <b>
                        <u>Mission</u>
                      </b>
                    </h4>
                    <div className="spacer">
                      <Typography variant="h7" style={{ display: "inline" }}>
                        Our mission is to create a vibrant and inclusive social
                        community that empowers individuals to connect, support,
                        and inspire one another. Through fostering meaningful
                        relationships and promoting collaboration, we aim to
                        address social challenges, celebrate diversity, and
                        drive positive change. By providing a platform for open
                        dialogue, personal growth, and collective learning, our
                        community endeavors to create a better world where
                        compassion, understanding, and equality thrive.
                      </Typography>
                    </div>
                    <h4 style={{ marginTop: "10px" }}>
                      <b>
                        <u>Contact Us</u>
                      </b>
                    </h4>
                    <div className="spacer">
                      <h6 className="aboutData">
                        <ImFacebook2 /> Leo Club of SLIIT
                      </h6>
                      <h6 className="aboutData">
                        <FaInstagram /> _Leo_Club_SLIIT
                      </h6>
                      <h6 className="aboutData">
                        <BsWhatsapp /> 0763689506
                      </h6>
                      <h6 className="aboutData">
                        <SiGmail /> LeoSliit@gmail.com
                      </h6>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2.5}>
                  <button className="editAbout">
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
                        <li>
                          Treat all members with respect and kindness: In our
                          community, we prioritize treating all members with
                          respect and kindness. We believe in fostering a
                          positive and inclusive atmosphere where everyone feels
                          valued and appreciated. We encourage the use of polite
                          and considerate language, and we value diverse
                          opinions and perspectives. By showing empathy and
                          understanding towards one another, we can create a
                          supportive environment for personal growth and
                          meaningful connections.
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
                          Foster an inclusive and welcoming environment for
                          everyone: Our community is built upon the principles
                          of inclusivity and acceptance. We strive to create a
                          space that welcomes individuals from all backgrounds,
                          cultures, and identities. By embracing diversity and
                          actively seeking different perspectives, we can
                          cultivate an enriching environment where everyone
                          feels safe to express themselves authentically. We
                          encourage collaboration and aim to build bridges that
                          connect people from various walks of life.
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
                          Engage in constructive and respectful discussions:
                          Open and respectful communication is the cornerstone
                          of our community. We encourage members to engage in
                          discussions that are constructive, where differing
                          opinions can be expressed and debated in a respectful
                          manner. Active listening and thoughtful responses are
                          crucial in fostering understanding and finding common
                          ground. We value the exchange of ideas and believe
                          that respectful dialogue contributes to personal
                          growth and collective learning.
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
                          Refrain from any form of harassment, discrimination,
                          or hate speech: We have a zero-tolerance policy
                          towards any form of harassment, discrimination, or
                          hate speech within our community. We are committed to
                          maintaining a safe and inclusive space for all
                          members. It is important to respect the dignity and
                          rights of every individual, refraining from any
                          behavior that marginalizes or harms others. We
                          strongly encourage reporting any instances of
                          harassment or discrimination, as we are dedicated to
                          promptly addressing such issues.
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
                      <button className="addRuleBtn">Add new Rule</button>
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
                          <img className="memberList1" src={p01} />
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
                          <img className="memberList1" src={p01} />
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
                          <img className="memberList1" src={p01} />
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
                          <img className="memberList1" src={p01} />
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
                          <img className="memberList1" src={p01} />
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
                          <img className="memberList1" src={p01} />
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
                  </Grid>
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
