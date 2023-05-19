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
  const handleSubmit = async (values) => {
    console.log("update running");
    //e.preventDefault();

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
      }, 2500);
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
        enableReinitialize
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={{
          name: name,
          description: description,
          commName: commName,
          location: location,
          date: date.substring(0, 10),
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    marginLeft: "15%",
                  }}
                >
                  <Col s={6} md={4}>
                    {image ? (
                      <Image
                        src={image}
                        style={{ height: "250px", width: "350px" }}
                      />
                    ) : (
                      <Image
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADTCAMAAABeFrRdAAAAb1BMVEX///8AAAA7OzuUlJRoaGimpqaPj48gICBra2uamporKyvt7e3AwMDw8PD09PTq6up9fX3Ly8tcXFxGRka5ubmJiYkcHBzl5eVXV1dzc3ODg4NjY2PExMTR0dGzs7Pb29sVFRUPDw81NTVOTk6hoaFoHZt8AAAFVElEQVR4nO3d2XbiMAyAYQilhRZSli4wXQd4/2ecw1CmJN5kW5Lljv7rHOrvFEJwnGQw0DRN0zRN0zRNi+xjvNismzrbrx4f5jHY+fWw+pp3qLZdlB4rUjDxa+lh4tXchbmPpQeJ2jLE3ZYeIXIzP/dX6fGh9+bjPpQeHUGtmzsvPTaK1m7vqvTYSHpwcT9Kj4ymT5d3UnpkRLn20aXHRdXKzp2VHhdZdq/x3bufXFXZbR9iP8padze6vXd9zsXXf6eOrVv1NvJ8T4vvvUtZWDfqbrNlHiJuEEt3m2vmEeJ207FMrNuot97Ua6beelOvmXrrTb1m6vXULg+Ll9XqZXFYSvxhgett3zu/HddjcWRMb2uZlF8IEyN6p6b22JRs7Cmheec7O3c43AFOxrGF5X1zaY95T9XwhuQNnBsOnIxjDMfr/e8eC55u5QrFex/iDodS5jRRvMa8rtkNsQMahhe0aEfIYSiC9w7ClfKORvACV3bYX5u7fC/43L+Iw458r+Mw0mxErwmX7wXsnE/d0mvCZXsB373nJOyxsr0RK5Wc60MYy/ZGLDN8xBhwm/fjI9v7Ave+ZI3034CzwNneBu5tcgZ6qj2ONwec7QXvnjGOodvTX8sAV+Vtz6NNB9f0fm6/B5sMrmh/1V6ONRVcz/dR+9R5sUQw5/EG+MIQWz1uKpjzePI5aYSnDG7inFj+74XuK3jK2T1buGngfO8I6s2Y0bFyk8D5XuB0Ts7Po/bT8ZLxYIT5nCsYN/3byMlNACN4gXus5L2VhxsPxpiPBX0F/0qQ/s3LjQajzLcDdtGf0c6vAtxYMIr3OexNfTe3v4Mv/Rrzejjny4KXjqaeIARw48BI50MDR5WpR5IgbhQY63z3Emk8nYDcmD+Atp7h3rnTeiL87EaDEderOE4TJh9GRnDhYMz1SHeWM2fb5KPIyGtSgWDk9WaHzvTObhp194dO0ZfgwsDo6wnns9F20zSb7WiWjk264hgEFrpeNOkCawhYpjfxenLAUY1Ib/Ll82GwRG/G3QKCYIHerJsjhMDyvOD5oSSwOG8mNwSW5s3mBsDCvAhc/7oJWV4UrhcsyovE9YEledG4HrAgb8SZt3SwHC8q1wlm8UKm65C5LjCH99p1oxpKrgPM4D3Oa4XABFw7mN57msbzg0m41mlvcu951tIHJuLawNTe70laNxhw+gkNTOy9nJN2gQm5JpjW252Ct4NJucavJVJv/0T4xrIN2Wf3q97luJRe87y/CSb+73J6bcsc+mByLp/XvqqjC6bnsnldi1guwQxcLq97zc43mIPL5PXdPvkMZuHyeP13i94zclm8oZtj7/m4HN7wvcD3bFwGL+TW5xs8UCByr7A7vVN7hXGpveIewUHrFcel9crjknoFcim9ErmEXpFcOq9MLplXKJfKK/ZxQTResVwar1wuiVcwl8IrmUvgFc3F98rmonuFc9G94MvZC4Xtjbi/SpHUe5F61ate0an3IvWqV72iU+9F6lWvekWn3ovUq96e137nQDn17pKf7R3L7tC7Damc6wd5Uq+ZeutNvWbqrTf1mqm33v4371O013aRZz11LVvrNr2fQGKeFZlQb9Wj/YkQ/YtJ5D3FGJhxQ1D7jUHAd+Cvrg+rN/g01GpzvA9KD4uqhcMLekBohdnfzoNBW3pgNO2dO7afucdy/XsH8lfRpeR7IgTb5at87TzcwWBWenjoBQ6aIp5jVUXBp/P+qKOOBnBI3PJdlE0d8FHEy13pgaI0gT8z4E3qZWTgdtPI52o/v46nozo7jJe1/pTVNE3TNE3TNE3TNE3TNE37Kf0B1UKGhH4CBssAAAAASUVORK5CYII="
                        style={{ height: "250px", width: "350px" }}
                      />
                    )}
                  </Col>
                </div>
              </Row>

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
                    as="textarea"
                    type="text"
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
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                    isInvalid={!!errors.date}
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
                variant="outline-success"
                type="submit"
                //onClick={() => setModalUpdateShow(true)}
              >
                Update
              </Button>
              <Button
                className="submitBTN"
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

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
    </div>
  );
}

export default ViewEvent;
