import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import './auth.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userData, setUserData } = useContext(UserContext);
  let loginUrl = "http://labinventory-api.herokuapp.com/sign-in/";
  //   const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(loginUrl, {
        user: {
          email: email,
          password: password,
        },
      });
      console.log(loginResponse.data.user.token);
      setUserData({
        email: loginResponse.data.user.email,
        token: loginResponse.data.user.token,
      });
      localStorage.setItem("auth-token", loginResponse.data.user.token);
      navigate("/inventory");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="login">
      <div className="container">
        <img
          className="labphoto"
          src="https://res.cloudinary.com/adelaney923/image/upload/v1640113474/labphoto1_l17oef.jpg"
          alt="labphoto"
        />
        <div id="loginForm">
          <div className="formcontent">
            <Form className="loginform" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <h5>Email Address</h5>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  <h5>Password</h5>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="loginLink" variant="primary" type="submit">
                Login
              </Button>
            </Form>

            <h5>New to LabList?</h5>
            <Button className="signuplink" variant="primary" type="submit">
              <Link className="signup-link" to="/sign-up">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
