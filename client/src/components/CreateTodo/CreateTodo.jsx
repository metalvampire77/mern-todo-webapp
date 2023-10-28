import { useState, useRef } from "react";
import axios from "axios";
import "../app.css";

function CreateTodo() {
  const [todo, setTodo] = useState("");
  const textBoxRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/todos", { todo, user_id: userInfo.id })
      .then((result) => {
        console.log(result);
        textBoxRef.current.value = "";
        setTodo("");
      })
      .catch((err) => console.log(err));

    location.reload();
  };

  return (
    <div className="todo">
      <input
        type="text"
        className="textBox"
        placeholder="enter todo"
        ref={textBoxRef}
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button className="addBtn" onClick={handleSubmit}>
        add
      </button>
    </div>
  );
}

export default CreateTodo;
