import { useState } from "react";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import Todos from "./components/Todos/Todos";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/todos" Component={Todos} />
        <Route path="/" Component={Home} />
        <Route path="/register" Component={SignupForm} />
        <Route path="/login" Component={LoginForm} />
      </Routes>
    </Router>
  );
}

export default App;
