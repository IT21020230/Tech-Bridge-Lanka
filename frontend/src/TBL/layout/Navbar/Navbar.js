import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/TBLlogo.png";

import { useLogout } from "../../hooks/useLogout";

import "./Navbar.css";

function OffcanvasExample() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="image-container">
        <img className="responsive-image" src={logo} />
      </div>
      {["sm"].map((expand) => (
        <Navbar key={expand} style={{backgroundColor: "#459c98"}} expand={expand} className="mb-3">
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
                    href="/login"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    href="/signup"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Register
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    className="btn-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
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
