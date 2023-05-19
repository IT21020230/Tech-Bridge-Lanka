import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Row } from "react-bootstrap";

function ParticipateModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Participate for this Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure want to participate for this event ?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ marginRight: "20px" }} variant="outline-success">
          Yes
        </Button>
        <Button onClick={props.onHide} variant="outline-primary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Events() {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listEvent");
  };

  const [modalParticipateShow, setModalParticipateShow] = React.useState(false);

  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:8000/api/events`);
      const json = await response.json();
      console.log(json);
      console.log(json[0]);

      if (response.ok) {
        setEvents(json);
      }
    };

    fetchEvents();
  }, []);

  //const dateWithoutTime = dateString.substring(0, 10);

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginBottom: "17px",
        marginLeft: "20%",
        marginRight: "15%",
        padding: "50px",
        width: "60%",
      }}
    >
      <div>
        <h1 className="head">Events</h1>
        {/* Check whether the user is logged in and not a member */}
        {user && user.role !== "member" && (
          <div
          // style={{
          //   display: "flex",
          //   justifyContent: "flex-end",
          //   marginRight: "15%",
          // }}
          >
            <Button
              variant="primary"
              className="btn-logout"
              onClick={handleClick}
            >
              Manage Events
            </Button>
          </div>
        )}
      </div>
      <br />

      {events &&
        events.map((event) => (
          <>
            <Card
              style={{
                marginLeft: "10%",
                backgroundColor: "#89c7dd",
                width: "80%",
              }}
            >
              <>
                <br />
                <Card.Title style={{ textAlign: "center" }}>
                  <h4>
                    <b>{event.name}</b>
                  </h4>
                  <h6>{event.commName}</h6>
                </Card.Title>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src="https://learnenglish.britishcouncil.org/sites/podcasts/files/RS6243_175211709-hig.jpg"
                    style={{ height: "250px", width: "400px" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    {event.description}
                    <br />
                    <br />
                    {`Date : ${event.date.substring(0, 10)}`}
                    <br />
                    {`Location : ${event.location}`}
                  </Card.Text>
                  {/* <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => setModalParticipateShow(true)}
                    >
                      Participate
                    </Button>
                  </div> */}
                </Card.Body>
              </>
            </Card>
            <br />
            <br />
          </>
        ))}

      <ParticipateModal
        show={modalParticipateShow}
        onHide={() => setModalParticipateShow(false)}
      />
    </div>
  );
}

export default Events;
