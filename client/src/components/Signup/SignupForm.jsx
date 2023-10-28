import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform authentication logic here with the email and password values.
    // For simplicity, we're just logging the values to the console.
    axios
      .post("http://127.0.0.1:5000/register", { name, email, password })
      .then((result) => {
        navigate("/login");
        console.log(result);
      })
      .catch((err) => console.log(err));

    console.log("name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="main">
      <div className="container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <label htmlFor="text">Name: </label>
            <input
              type="text"
              id="text"
              value={name}
              onChange={handleNameChange}
              placeholder="enter your name"
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="enter your mail"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="enter your password"
            />
          </div>
          <div>
            <button type="submit" className="btn">
              Sign up
            </button>
            <Link to="/login">
              <h5>Already registered login</h5>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
