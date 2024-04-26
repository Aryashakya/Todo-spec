import React from "react";
import "../styles/Todo.css";

function Todo({ todo, onDelete }) {
  const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US");

  return (
    <div className="todo-container">
      <p className="todo-title">{todo.title}</p>
      <p className="todo-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default Todo;
