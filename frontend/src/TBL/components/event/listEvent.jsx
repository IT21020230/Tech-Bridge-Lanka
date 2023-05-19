import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewEventList() {
  const navigate = useNavigate();
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

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginLeft: "200px",
        marginRight: "200px",
        marginBottom: "200px",
        marginTop: "60px",
        padding: "50px",
      }}
    >
      <div>
        <h1 className="head">Event List</h1>
      </div>
      <br />
      <Table responsive style={{ backgroundColor: "#89c7dd" }}>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Community</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event, count) => (
              <tr key={event._id}>
                <th scope="row">{count + 1}</th>
                <td>{event.name}</td>
                <td>{event.commName}</td>
                <td>{event.location}</td>
                <td>{event.date.substring(0, 10)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/viewEvent/${event._id}`)}
                  >
                    View more
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewEventList;
