import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
// import ErrorNotice from "./ErrorNotice";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userData, setUserData } = useContext(UserContext);
  let loginUrl = "http://localhost:8000/sign-in/";
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
      console.log(loginResponse.data.user.token)
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
    <>
      <div id="login">
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
            Login
          </Button>
        </Form>

        <p>New to LabList?</p>
        <Button variant="primary" type="submit">
          <Link className="signuplink" to="/sign-up">
            Sign Up
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Login;
