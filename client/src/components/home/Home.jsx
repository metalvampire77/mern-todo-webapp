import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <Link to="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.registerBtn}>Sign up</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
