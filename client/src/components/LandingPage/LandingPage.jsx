import axios from "axios";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get("name");

  return (
    <>
      <h1>welcome back {name} </h1>
    </>
  );
}

export default LandingPage;
