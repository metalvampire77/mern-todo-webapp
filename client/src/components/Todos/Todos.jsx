import { useState, useRef, useEffect } from "react";
import axios from "axios";
import CreateTodo from "../CreateTodo/CreateTodo";
import { useNavigate } from "react-router-dom";
import bin from "/src/assets/delete.png";

export function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

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
    <div className="main">
      <div className="container">
        <div className="heading">
          <h1>To-do list</h1>
          <button
            className="logout-btn"
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
            <div className="items" key={todo._id}>
              <p
                className={todo.done ? "lineThrough" : "none"}
                onClick={() => completeTodo(todo._id, todo.done)}
              >
                {/* <input type="checkbox"></input> */}
                <label className="todo-text">{todo.todo}</label>
              </p>
              <img
                src={bin}
                alt=""
                className="delete-img"
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
