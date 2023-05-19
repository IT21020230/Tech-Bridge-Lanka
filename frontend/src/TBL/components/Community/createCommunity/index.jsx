import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import "./index.css";
import Axios from "axios";
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormExample() {
  const [fields, setFields] = useState([{ value: "" }]);
  const [pdf, setPDF] = useState("");
  const [Logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [pdfERR, setPDFERR] = useState({});
  const [logoERR, setLOGOERR] = useState({});
  const [coverERR, setCoverERR] = useState({});
  const [logoFile, setLogoFileName] = useState("");
  const [logoFileData, setLogoFileData] = useState(null);
  const [coverFile, setCoverFileName] = useState("");
  const [coverFileData, setCoverFileData] = useState(null);
  const [pdfFile, setPDFFileName] = useState("");
  const [PDFFileData, setPDFFileData] = useState(null);

  const [checkPDF, setCheckPDF] = useState(false);
  const [checkLogo, setCheckLogo] = useState(false);
  const [checkCover, setCheckCover] = useState(false);
  const [userID, setUserID] = useState("ABC123");

  const { user } = useAuthContext();

  const UID = user.userId;

  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const values = [...fields];
    values.push({ value: "" });
    setFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
  };

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

    contactNumber: yup
      .string()
      .required("contact number required")
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be a 10-digit number without spaces or dashes"
      ),
    // zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    memberNum: yup.string().required("Community size is required"),
  });

  const logoChangeHandler = (e) => {
    const file = e.target.files[0];
    const imageERR = {};

    if (file) {
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
    } else {
      imageERR.imageshort = "Please select a file!";
      setLogoFileData(null);
      setLogoFileName("");
      setCheckLogo(false);
    }

    setLOGOERR(imageERR);
  };
  const coverChangeHandler = (e) => {
    const file = e.target.files[0];
    const coverERR = {};

    if (file) {
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
    } else {
      coverERR.cover = "Please select a file!";
      setCoverFileData(null);
      setCoverFileName("");
      setCheckCover(false);
    }

    setCoverERR(coverERR);
  };

  const pdfChangeHandler = (e) => {
    setPDFFileData(e.target.files[0]);
    setPDFFileName(e.target.files[0].name);

    const file = e.target.files[0];
    const pdfERR = {};
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        pdfERR.pdfshort = "";
        setPDFERR(pdfERR);
        setCheckPDF(true);
      } else {
        pdfERR.pdfshort = "please enter pdf type file!";
        setPDFERR(pdfERR);
        setCheckPDF(false);
      }
    } else {
      pdfERR.pdfshort = "Please select a file!";
      setPDFERR(pdfERR);
      setCheckPDF(false);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const commName = values.communityName;
    const location = values.Location;
    const contactNumber = values.contactNumber;
    const email = values.email;
    const startedDate = values.date;
    const size = values.memberNum;
    const registrationFile = pdf;
    const logo = Logo;
    const coverPic = cover;
    console.log(checkPDF);
    console.log(checkLogo);
    console.log(checkCover);
    if (checkPDF && checkLogo && checkCover) {
      console.log(commName);
      console.log(location);
      console.log(contactNumber);
      console.log(email);
      console.log(startedDate);
      console.log(size);
      console.log(registrationFile);
      // console.log(logo);
      // console.log(coverPic);

      const data = new FormData();

      data.append("image", logoFileData);
      console.log("BBBBBBBBBBBB");
      console.log(logoFileData);
      await fetch("http://localhost:7000/logo", {
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
      await fetch("http://localhost:7000/cover", {
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

      const data3 = new FormData();

      data3.append("image", PDFFileData);

      await fetch("http://localhost:7000/pdf", {
        method: "POST",
        body: data3,
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

      await Axios.post("http://localhost:7000/api/community/createCommunity", {
        commName,
        location,
        contactNumber,
        email,
        startedDate,
        size,
        registrationFile: pdfFile,
        logo: logoFile,
        coverPic: coverFile,
        createdBy: UID,
      }).then(async (resault) => {
        const commID = resault.data._id;

        fields.map(async (data) => {
          console.log(data.value);
          await Axios.post(
            "http://localhost:7000/api/communityRule/createRule",
            {
              commID,
              rule: data.value,
            }
          );
        });

        await Axios.get(`http://localhost:7000/api/user/${UID}`).then(
          async (response) => {
            const uName = response.data.name;
            const proPic = response.data.photo;

            await Axios.post(
              "http://localhost:7000/api/communityMember/createCommunityMember",
              {
                userID: UID,
                name: uName,
                pic: proPic,
                comId: commID,
                role: "admin",
              }
            );
            toast.success(`Community created `, {
              position: "bottom-left",
            });
            setTimeout(() => {
              window.location.href = `/`;
            }, 1000);
          }
        );
      });
    }
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    const pdfERR = {};
    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      pdfERR.pdfshort = "";
      setPDFERR(pdfERR);
    } else {
      pdfERR.pdfshort = "please enter pdf type file!";
      setPDFERR(pdfERR);
    }

    console.log(file);
    const base64 = await convertToBase64(file);
    setPDF(base64);
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setLogo(base64);
  };
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setCover(base64);
  };

  return (
    <div
      style={{
        backgroundColor: "#E8E8E8",
        marginLeft: "200px",
        marginRight: "200px",

        padding: "50px",
      }}
    >
      {" "}
      <ToastContainer />
      <div>
        <h1 className="head">Community Registration</h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleFormSubmit}
        initialValues={{
          communityName: "",
          Location: "",
          email: "",
          contactNumber: "",
          state: "",
          zip: "",
          communitySize: "",
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label style={{ marginTop: "20px" }}>
                  Community Name
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="communityName"
                    value={values.communityName}
                    onChange={handleChange}
                    isInvalid={!!errors.communityName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.communityName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Location
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="Location"
                    value={values.Location}
                    onChange={handleChange}
                    isInvalid={!!errors.Location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Location}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Contact Number
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.contactNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Email
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Started date
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    aria-describedby="inputGroupPrepend"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikCommunitySize"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Member count
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="memberNum"
                    value={values.memberNum}
                    onChange={handleChange}
                    isInvalid={!!errors.memberNum}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.memberNum}
                  </Form.Control.Feedback>
                </InputGroup>
                <ErrorMessage
                  name="communitySize"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community Registration File
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="registerFile"
                    value={values.registerFile}
                    onChange={pdfChangeHandler}
                    isInvalid={!!errors.registerFile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registerFile}
                  </Form.Control.Feedback>
                </InputGroup>
                <label>
                  {Object.keys(pdfERR).map((key) => {
                    return <div style={{ color: "red" }}>{pdfERR[key]}</div>;
                  })}{" "}
                </label>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community Logo
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="logo"
                    value={values.logo}
                    onChange={logoChangeHandler}
                    // isValid={touched.logo && !errors.logo}
                    // isInvalid={!!errors.logo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.logo}
                  </Form.Control.Feedback>
                </InputGroup>
                <label>
                  {Object.keys(logoERR).map((key) => {
                    return <div style={{ color: "red" }}>{logoERR[key]}</div>;
                  })}{" "}
                </label>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community page cover photo
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="cover"
                    value={values.cover}
                    onChange={coverChangeHandler}
                    isInvalid={!!errors.cover}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cover}
                  </Form.Control.Feedback>
                </InputGroup>
                <label>
                  {Object.keys(coverERR).map((key) => {
                    return <div style={{ color: "red" }}>{coverERR[key]}</div>;
                  })}{" "}
                </label>
              </Form.Group>

              <Form.Label
                style={{
                  marginTop: "20px",
                }}
              >
                Community Rules
              </Form.Label>
              {fields.map((field, index) => (
                <Form.Group
                  key={index}
                  as={Col}
                  md="10"
                  controlId="validationFormikCommunitySize"
                  className="ruleContainer"
                >
                  <Form.Control
                    as="textarea"
                    md="5"
                    value={field.value}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                    className="ruleArea"
                  />
                  {index === fields.length - 1 && (
                    <Button onClick={handleAddField} className="btn2">
                      <IoAddSharp />
                    </Button>
                  )}
                  {index > 0 && (
                    <Button
                      onClick={() => handleRemoveField(index)}
                      className="btn"
                    >
                      <BiTrash />
                    </Button>
                  )}
                </Form.Group>
              ))}
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <Button className="submitBTN" type="submit">
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormExample;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
