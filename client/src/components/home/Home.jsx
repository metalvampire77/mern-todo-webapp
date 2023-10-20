import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="main">
        <div className="container">
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-register">Sign up</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
