import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = "http://127.0.0.1:5000";

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/todos");
      // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo.id);
    }
  }, [history]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform authentication logic here with the email and password values.
    // For simplicity, we're just logging the values to the console.
    axios
      .post("/login", { email, password })
      .then((result) => {
        const { message, user_id } = result.data;
        if (message === "success") {
          console.log(message);
          localStorage.setItem("userInfo", JSON.stringify({ id: user_id }));
          navigate(`/todos`);
        } else if (message === "Wrong password") {
          alert("Wrong password");
        } else {
          alert("User not found");
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.email}>
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
          <div className={styles.password}>
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
            <button type="submit" className={styles.btn}>
              Log In
            </button>
            <Link to="/register">
              <h5>New user sign up</h5>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
