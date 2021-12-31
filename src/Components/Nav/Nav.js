import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import UserContext from "../../context/userContext";
import './nav.css'


const Header = () => {

  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    console.log('loggingout')
    fetch("http://labinventory-api.herokuapp.com/sign-out/", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${userData.token}`,
      },
    }).then((data) => {
      setUserData({
        email: undefined,
        token: undefined,
      });
    });
  }

  return (
    <>
      <Navbar sticky="top" bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-links-main" to="/">
              <span className="lablist">LabList</span>
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
                <Link className="nav-links-main" to="/">
                  <span className="lablist">LabList</span>
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* <Link className="nav-links" to="/sign-up">
                    SignUp
                  </Link> */}
                <Link className="nav-links" to="/login">
                  {userData.token ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    "Login"
                  )}
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
