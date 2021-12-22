import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
// import ErrorNotice from "./ErrorNotice";


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  let signupUrl = "http://localhost:8000/sign-up/";
  let loginUrl = "http://localhost:8000/sign-in/";
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
          }
      });
      setUserData({
        email: loginResponse.data.email,
        token: loginResponse.data.token,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      navigate('/inventory')
      console.log(newUser.data);
      console.log(loginResponse.data)
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div id="signup">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>

        <p>Already have an account?</p>
        <Button variant="primary" type="submit">
          <Link className='signinlink' to="/login">
              Sign In
          </Link>
        </Button>
      </div>
    </>
  );
}

export default SignUp;
