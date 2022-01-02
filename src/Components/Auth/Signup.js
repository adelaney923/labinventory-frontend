import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import './auth.css'

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  let signupUrl = "https://labinventory-api.herokuapp.com/sign-up/";
  let loginUrl = "https://labinventory-api.herokuapp.com/sign-in/";
  //   const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(signupUrl, {
        user: {
          email: email,
          password: password,
        },
      });
      const loginResponse = await axios.post(loginUrl, {
        user: {
          email: email,
          password: password,
        },
      });
      setUserData({
        email: loginResponse.data.email,
        token: loginResponse.data.token,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      navigate("/inventory");
      console.log(newUser.data);
      console.log(loginResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="signup">
        <div className="container">
          <img
            className="labphoto"
            src="https://res.cloudinary.com/adelaney923/image/upload/v1640113474/labphoto1_l17oef.jpg"
            alt="labphoto"
          />
          <div id="signupForm">
            <div className="formcontent">
              <Form className="signupform" onSubmit={handleSubmit}>
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
                <Button className="signuplink" variant="primary" type="submit">
                  Create Account
                </Button>
              </Form>

              <h5>Already have an account?</h5>
              <Button className="loginLink" variant="primary" type="submit">
                <Link className="login-link" to="/login">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
