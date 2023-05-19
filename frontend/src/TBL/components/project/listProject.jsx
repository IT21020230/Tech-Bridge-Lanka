import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

function ViewProjectList() {
  const navigate = useNavigate();
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
        marginLeft: "200px",
        marginRight: "200px",
        marginBottom: "200px",
        marginTop: "60px",
        padding: "50px",
      }}
    >
      <div>
        <h1 className="head">Project List</h1>
      </div>
      <br />
      <Table responsive style={{ backgroundColor: "#89c7dd" }}>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Community</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project, count) => (
              <tr key={project._id}>
                <th scope="row">{count + 1}</th>
                <td>{project.name}</td>
                <td>{project.commName}</td>
                <td>{project.startDate.substring(0, 10)}</td>
                <td>{project.endDate.substring(0, 10)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      const url = `/viewProject/${project._id}`;
                      window.location.href = url;
                    }}
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

export default ViewProjectList;
