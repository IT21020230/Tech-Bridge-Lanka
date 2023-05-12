import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

function ColabModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Collaborate for this Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure want to collaborate for this project ?</h5>
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

function Projects() {
  const [modalColabShow, setModalColabShow] = React.useState(false);

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`http://localhost:7000/api/projects`);
      const json = await response.json();
      console.log(json);
      console.log(json[0]);
      if (response.ok) {
        setProjects(json);
      }
    };

    fetchProjects();
  }, []);

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
        <h1 className="head">Projects</h1>
      </div>
      <br />

      {projects &&
        projects.map((project) => (
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
                  <h4 key={project._id}>
                    <b>{project.name}</b>
                  </h4>
                  <h6>{project.commName}</h6>
                </Card.Title>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={`${project.image}`}
                    style={{ height: "250px", width: "400px" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    {project.description}
                    <br />
                    <br />
                    {`Start Date: ` + project.startDate}
                    <br />
                    {`End Date: ` + project.endDate}
                  </Card.Text>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="success"
                      onClick={() => setModalColabShow(true)}
                    >
                      Contribute
                    </Button>
                  </div>
                </Card.Body>
              </>
            </Card>
            <br />
            <br />
          </>
        ))}

      <ColabModal
        show={modalColabShow}
        onHide={() => setModalColabShow(false)}
      />
    </div>
  );
}

export default Projects;
