import { useState, useEffect } from "react";
import api from "../api";
import Todo from "../components/Todo";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    api
      .get("/api/todos/")
      .then((res) => res.data)
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/todos/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete.");
        getTodos();
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
        getTodos();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Todo List</h2>
        {todos.map((todo) => (
          <Todo todo={todo} onDelete={deleteNote} key={todo.id} />
        ))}
      </div>
      <h2>Create a Todo</h2>
      <form onSubmit={createTodo}>
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
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}

export default Home;
