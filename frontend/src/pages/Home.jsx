import { useState, useEffect } from "react";
import api from "../api";
import Todo from "../components/Todo";
import "../styles/Home.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("Create");
  const [creating, setCreating] = useState(true);
  const [id, setId] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getTodos(filter);
    setCreating(true);
    setAction("Create");
  }, [filter]);

  const getTodos = (filter) => {
    api
      .get(`/api/todos/${filter}`)
      .then((res) => res.data)
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const toggleTodo = (id, completed) => {
    api
      .patch(`/api/todos/update/${id}/`, { completed: !completed })
      .then((res) => {
        if (res.status === 200) alert("Todo toggled");
        else alert("Failed to toggle todo.");
        getTodos(filter);
      })
      .catch((err) => alert(err));
  };

  const updateForm = (id, title) => {
    setId(id);
    setTitle(title);
    setAction("Update");
    setCreating(false);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    api
      .patch(`/api/todos/update/${id}/`, { title: title })
      .then((res) => {
        if (res.status === 200) alert("Todo updated");
        else alert("Failed to update todo.");
        getTodos(filter);
      })
      .catch((err) => alert(err));
  };

  const deleteTodo = (id) => {
    api
      .delete(`/api/todos/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete.");
        getTodos(filter);
      })
      .catch((error) => alert(error));
  };

  const createTodo = (e) => {
    e.preventDefault();
    api
      .post("/api/todos/", { title })
      .then((res) => {
        if (res.status === 201) alert("Todo created");
        else alert("Failed to create todo.");
        getTodos(filter);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <div>
          <button onClick={() => setFilter("")}>All</button>
          <button onClick={() => setFilter("?completed=true/")}>
            Completed
          </button>
          <button onClick={() => setFilter("?completed=false/")}>Todo</button>
        </div>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            onDelete={deleteTodo}
            key={todo.id}
            onToggle={toggleTodo}
            onUpdate={updateForm}
          />
        ))}
      </div>
      <h2>{action} Todo</h2>
      <form onSubmit={creating ? createTodo : updateTodo}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default Home;
