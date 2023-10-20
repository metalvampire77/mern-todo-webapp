import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      .post("/login", { email, password })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="main">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="enter your mail"
              required
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
              required
            />
          </div>
          <div>
            <button type="submit" className="btn">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
