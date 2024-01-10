import { useState, useRef, useEffect } from "react";
import axios from "axios";
import CreateTodo from "../CreateTodo/CreateTodo";
import { useNavigate } from "react-router-dom";
import bin from "/src/assets/delete.png";
import styles from "../app.module.css";

export function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const url = "http://127.0.0.1:5000";

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchData = () => {
      if (userInfo) {
        axios
          .get(`/get`, {
            params: { user_id: userInfo.id },
          })
          .then((result) => {
            setTodos(result.data);
          })
          .catch((err) => console.log(err));
      } else navigate("/login");
    };

    fetchData();
  }, []);

  const completeTodo = (id, done) => {
    axios
      .put("/update/" + id, { done })
      .then((result) => console.log("success"))
      .catch((err) => console.log(err));
    location.reload();
  };

  const deleteTodo = (id) => {
    axios
      .delete("/delete/" + id)
      .then((result) => console.log("success"))
      .catch((err) => console.log(err));
    location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>To-do list</h1>
          <button
            className={styles.contactUsBtn}
            onClick={() => {
              navigate("/contactus");
            }}
          >
            contact us
          </button>
          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/login");
            }}
          >
            logout
          </button>
        </div>
        <CreateTodo />
        {todos.length === 0 ? (
          <div>
            <h2>no record</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div className={styles.items} key={todo._id}>
              <p
                className={todo.done ? styles.lineThrough : styles.none}
                onClick={() => completeTodo(todo._id, todo.done)}
              >
                {/* <input type="checkbox"></input> */}
                <label className={styles.todoText}>{todo.todo}</label>
              </p>
              <img
                src={bin}
                alt=""
                className={styles.deleteImg}
                onClick={() => deleteTodo(todo._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todos;
