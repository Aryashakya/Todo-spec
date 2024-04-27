import React from "react";
import "../styles/Todo.css";

function Todo({ todo, onToggle, onUpdate, onDelete }) {
  const formattedDate = new Date(todo.created_at).toLocaleDateString("en-US");

  return (
    <div className="todo-container">
      <p className="todo-title">{todo.title}</p>
      <p className="todo-date">{formattedDate}</p>
      {todo.completed ? <p>Completed</p> : <p>Todo</p>}
      <button
        className="delete-button"
        onClick={() => onToggle(todo.id, todo.completed)}
      >
        Toggle
      </button>
      <button
        className="delete-button"
        onClick={() => onUpdate(todo.id, todo.title)}
      >
        Edit
      </button>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default Todo;
