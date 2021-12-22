import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";

const Header = () => {

  return (
    <>
        <Navbar sticky="top" bg="light" expand={false}>
          <Container fluid>
            <Navbar.Brand>
              <Link to="/">
                <span className="sitename">LabList</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <Link to="/">
                    <span className="sitename">LabList</span>
                  </Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link className="nav-links" to="/sign-up">
                    SignUp
                  </Link>
                  <Link className="nav-links" to="/login">
                    Login
                  </Link>
                  <Link className="nav-links" to="/inventory">
                    Inventory
                  </Link>
                  <Link className="nav-links" to="/contact">
                    Contact
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
};

export default Header;
