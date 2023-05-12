import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ViewProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState({
    name: "",
    commID: "",
    commName: "",
    description: "",
    image: "",
    startDate: "",
    endDate: "",
    __v: 0,
    _id: "",
  });

  //GET PROJECT DATA
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`http://localhost:7000/api/projects/${id}`);
      const json = await response.json();

      if (response.ok) {
        setProjects({
          name: `${json["name"]}`,
          commID: `${json["commID"]}`,
          commName: `${json["commName"]}`,
          description: `${json["description"]}`,
          image: `${json["image"]}`,
          startDate: `${json["startDate"]}`,
          endDate: `${json["endDate"]}`,
          __v: 0,
          _id: `${json["_id"]}`,
        });
        setName(json["name"]);
        setCommID(json["commID"]);
        setCommName(json["commName"]);
        setDescription(json["description"]);
        setImage(json["image"]);
        setStartDate(json["startDate"]);
        setEndDate(json["endDate"]);

        console.log(json);
      } else {
        console.log("failed");
      }
    };

    fetchProjects();
  }, [setProjects]);

  const [name, setName] = useState("");
  // const [commID, setCommID] = useState('');
  // const [commName, setCommName] = useState('');
  const [commID, setCommID] = useState("64577ee1f64e188701af5510");
  const [commName, setCommName] = useState("Leo Club of SLIIT");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  //UPDATE PROJECT DATA
  const handleSubmit = async (e, values) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/api/projects/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        image: values.image,
        startDate: values.startDate,
        endDate: values.endDate,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("Project updated successfully.", json);

      toast.success(`Product updated successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    }
  };

  //DELETE PROJECT
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/api/projects/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("Project deleted successfully.", json);

      toast.success(`Project deleted successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/listProject");
      }, 3000);
    }
  };

  //Update modal
  function UpdateModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Your Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to update your account ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginRight: "20px" }}
            variant="success"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //Delete modal
  function DeleteModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Your Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to permanently delete your account ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginRight: "20px" }}
            variant="danger"
            onClick={handleDeleteSubmit}
          >
            Delete
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const schema = yup.object().shape({
    name: yup.string().required("Please enter a Project Name!"),
    description: yup.string().required("Please fill the field!"),
    startDate: yup.string().required("Please enter a the start date!"),
    endDate: yup.string().required("Please enter a the end date!"),
  });

  console.log("=================");
  console.log(name);

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginLeft: "30%",
        marginRight: "30%",
        marginBottom: "17px",
        padding: "50px",
      }}
    >
      <ToastContainer />
      <div>
        <h1 className="head">Project Details</h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={{
          name: name,
          commName: commName,
          description: description,
          image: image,
          startDate: startDate,
          endDate: endDate,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label style={{ marginTop: "20px" }}>
                  Project Name
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    //defaultValue={name}
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label style={{ marginTop: "20px" }}>Community</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled
                    type="text"
                    rows="5"
                    aria-describedby="inputGroupPrepend"
                    name="commName"
                    defaultValue={commName}
                    // value={values.commName}
                    // onChange={handleChange}
                    // isValid={touched.commName && !errors.commName}
                    // isInvalid={!!errors.commName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.commName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label style={{ marginTop: "20px" }}>
                  Description
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="textarea"
                    rows="5"
                    aria-describedby="inputGroupPrepend"
                    name="description"
                    defaultValue={description}
                    //value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Start date
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="startDate"
                    defaultValue={startDate}
                    //value={values.startDate}
                    onChange={handleChange}
                    isValid={touched.startDate && !errors.startDate}
                    isInvalid={!!errors.startDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startDate}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  End date
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="endDate"
                    defaultValue={endDate}
                    //value={values.endDate}
                    onChange={handleChange}
                    isValid={touched.endDate && !errors.endDate}
                    isInvalid={!!errors.endDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "100%" }}
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload an Image
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="logo"
                    defaultValue={image}
                    //value={values.image}
                    onChange={handleChange}
                    isValid={touched.photo && !errors.photo}
                    isInvalid={!!errors.photo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.photo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <div style={{ marginTop: "30px" }}>
              <Button
                className="submitBTN"
                type="submit"
                variant="outline-success"
                onClick={() => setModalUpdateShow(true)}
              >
                Update
              </Button>
              <Button
                className="submitBTN"
                type="submit"
                variant="outline-danger"
                onClick={() => setModalDeleteShow(true)}
                style={{ marginLeft: "30px" }}
              >
                Delete
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <UpdateModal
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false)}
      />

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
    </div>
  );
}

export default ViewProject;
