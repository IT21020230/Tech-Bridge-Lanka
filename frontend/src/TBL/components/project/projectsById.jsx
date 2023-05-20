import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function handleContribution(commId, pId, pName, personId, personName) {
  //console.log(commId, pId, pName, personId, personName);
  axios
    .post("http://localhost:7000/api/projectCon/", {
      commID: commId,
      projectId: pId,
      projectName: pName,
      personId: personId,
      personName: personName,
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);

      if (res) {
        console.log("Contributed to project successfully.");

        toast.success(`You were added to the contribution list.`, {
          position: "bottom-left",
        });
        setTimeout(() => {}, 1000);
      }
    });
}

function Projects() {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [modalColabShow, setModalColabShow] = React.useState(false);

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:7000/api/projects/commID/` + id
      );
      const json = await response.json();
      console.log(json);
      console.log(json[0]);
      if (response.ok) {
        setProjects(json);
      }
    };

    fetchProjects();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listProject");
  };

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
      <ToastContainer />
      <div>
        <h1 className="head">Projects</h1>
        {/* Check whether the user is logged in and not a member */}
        {user && user.role !== "member" && (
          <div>
            <Button
              variant="primary"
              className="btn-logout"
              onClick={() => (window.location.href = "/listProject")}
            >
              Manage Projects
            </Button>
          </div>
        )}
      </div>
      <br />

      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <>
            <Card
              style={{
                marginLeft: "10%",
                backgroundColor: "#89c7dd",
                width: "80%",
              }}
              key={project._id}
            >
              <>
                <br />
                <Card.Title style={{ textAlign: "center" }}>
                  <h4>
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
                    {`Start Date: ` + project.startDate.substring(0, 10)}
                    <br />
                    {`End Date: ` + project.endDate.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </>
            </Card>
            <br />
            <br />
          </>
        ))
      ) : (
        <p>Loading projects...</p>
      )}

      {/* <ColabModal
        show={modalColabShow}
        onHide={() => setModalColabShow(false)}
      /> */}
    </div>
  );
}

export default Projects;

// function ColabModal(props) {
//   const { show, onHide, CommId, pId, pName, personId, personName } = props;
//   console.log(show, onHide, CommId, pId, pName, personId, personName);
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Collaborate for this Project
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h5>Are you sure want to collaborate for this project ?</h5>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           style={{ marginRight: "20px" }}
//           variant="outline-success"
//           onClick={() =>
//             handleContribution(CommId, pId, pName, personId, personName)
//           }
//         >
//           Yes
//         </Button>
//         <Button onClick={props.onHide} variant="outline-primary">
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
