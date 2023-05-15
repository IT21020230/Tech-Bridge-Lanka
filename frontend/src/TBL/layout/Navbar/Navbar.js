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
                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Home
                  </Nav.Link>

                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Stories
                  </Nav.Link>

                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Map
                  </Nav.Link>

                  <Nav.Link
                    href="#action1"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    DDD
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

                  {/* Check whether the user is logged in */}
                  {user && (
                    <div>
                      <span>{user.email}</span>
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
                        {/* <Nav.Link
                          href="/signup"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          Register
                        </Nav.Link> */}
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
