import { useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/register" Component={SignupForm} />
        <Route path="/login" Component={LoginForm} />
      </Routes>
    </Router>
  );
}

export default App;
