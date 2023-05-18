import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`http://localhost:7000/api/user`);
      const json = await response.json();
      console.log(json);
      console.log(json[0]);
      if (response.ok) {
        setUsers(json);
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
        <h1 className="head">All Users</h1>
      </div>
      <br />
      <Table responsive style={{ backgroundColor: "#89c7dd" }}>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">User Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, count) => (
              <tr key={user._id}>
                <th scope="row">{count + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/infoUser/${user._id}`)}
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

export default UserList;
