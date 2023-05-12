import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

function ViewEvent() {
  const [name, setName] = useState("");
  const [commID, setCommID] = useState("64577ee1f64e188701af5510");
  const [commName, setCommName] = useState("Leo Club of SLIIT");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState({
    name: "",
    commID: "",
    commName: "",
    description: "",
    image: "",
    location: "",
    date: "",
    __v: 0,
    _id: "",
  });

  //GET EVENT DATA
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:7000/api/events/${id}`);
      const json = await response.json();

      if (response.ok) {
        setEvents({
          name: `${json["name"]}`,
          commID: `${json["commID"]}`,
          commName: `${json["commName"]}`,
          description: `${json["description"]}`,
          image: `${json["image"]}`,
          location: `${json["location"]}`,
          date: `${json["date"]}`,
          __v: 0,
          _id: `${json["_id"]}`,
        });
        setName(json["name"]);
        setCommID(json["commID"]);
        setCommName(json["commName"]);
        setDescription(json["description"]);
        setImage(json["image"]);
        setLocation(json["location"]);
        setDate(json["date"]);

        console.log(json);
      } else {
        console.log("failed");
      }
    };

    fetchEvents();
  }, [setEvents]);

  //Update EVENT
  const handleSubmit = async (e, values) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/api/events/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        image: values.image,
        location: values.location,
        date: values.date,
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
      console.log("Event updated successfully.", json);

      toast.success(`Event updated successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/listEvent");
      }, 3000);
    }
  };

  //DELETE EVENT
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/api/events/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("Event deleted successfully.", json);

      toast.success(`Event deleted successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        navigate("/listEvent");
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
            Update this Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to update this event ?</h5>
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
            Delete this Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure want to permanently delete this event ?</h5>
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
    email: yup
      .string()
      .required("Please enter an Email!")
      .email("Please enter a valid Email!"),

    password: yup
      .string()
      .required("Please enter a Password!")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        "Password should between 8 to 15 characters, and must include atleast 1 uppercase, 1 lowercase and 1 number!"
      ),

    phone: yup
      .string()
      .required("Please enter a Phone number!")
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be a 10-digit number without spaces or dashes"
      ),

    name: yup.string().required("Please enter the Name!"),

    age: yup.string().required("Please enter the Age!"),

    province: yup.string().required("Please enter the Province!"),

    city: yup.string().required("Please enter the City!"),
  });

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
        <h1 className="head">Event Details</h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={{
          name: name,
          description: description,
          commName: commName,
          location: location,
          date: date,
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
                <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="name"
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
                    value={"Leo Club of SLIIT"}
                    onChange={handleChange}
                    isValid={touched.commName && !errors.commName}
                    isInvalid={!!errors.commName}
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
                    value={values.description}
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
                <Form.Label style={{ marginTop: "20px" }}>Location</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    rows="5"
                    aria-describedby="inputGroupPrepend"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    isValid={touched.location && !errors.location}
                    isInvalid={!!errors.location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
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
                  Date
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    aria-describedby="inputGroupPrepend"
                    name="startDate"
                    value={values.startDate}
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
                  Upload an image
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="logo"
                    value={values.photo}
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

export default ViewEvent;
