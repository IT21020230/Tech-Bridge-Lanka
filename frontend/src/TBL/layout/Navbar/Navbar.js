import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/TBLlogo.png";

import { useAuthContext } from "../../hooks/useAuthContext";

import { useLogout } from "../../hooks/useLogout";

import "./Navbar.css";

import Row from "react-bootstrap/esm/Row";

function OffcanvasExample() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  //const userRole = user.role;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="image-container">
        <img className="responsive-image" src={logo} />
      </div>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mb-3"
          style={{
            backgroundColor: "#459c98",
          }}
        >
          <Container fluid>
            <Navbar.Brand
              href="#"
              style={{ color: "white", fontWeight: "bold" }}
            ></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  TBL
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* <h4 style={{ textAlign: "left" }}>ADMIN</h4> */}
                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Home
                  </Nav.Link>

                  <Nav.Link
                    href="/posts"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Stories
                  </Nav.Link>

                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Communities
                  </Nav.Link>

                  <Nav.Link
                    href="/projects"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Projects
                  </Nav.Link>
                  <Nav.Link
                    href="/events"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Events
                  </Nav.Link>

                  <Nav.Link
                    href="Map-live"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Map
                  </Nav.Link>

                  <Nav.Link
                    href="/dd-data"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    DDD
                  </Nav.Link>

                  {/* Check whether the user is logged in and admin */}
                  {user && user.role === "admin" && (
                    <Nav.Link
                      href="/listUser"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Users
                    </Nav.Link>
                  )}

                  <Nav.Link
                    href="/listUser"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Users
                  </Nav.Link>
                  {user &&
                    (user.role === "admin" || user.role === "moderator") && (
                      <Nav.Link
                        href="/add-post"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        Create Story
                      </Nav.Link>
                    )}


                  {/* Check whether the user is logged in */}
                  {user && (
                    <div>
                      <span>
                        <a href="/viewUser">
                          <b>{user.name}</b>
                        </a>
                      </span>
                      <Button
                        variant="danger"
                        className="btn-logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                  {!user && (
                    <div>
                      <Row>
                        <Nav.Link
                          href="/login"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          Login
                        </Nav.Link>
                      </Row>
                    </div>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
