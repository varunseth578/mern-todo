import React, { useEffect, useState } from "react";

export default function TodoApp({ setIsLoggedIn }) {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch("http://localhost:8080/get_all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setTodos(data.todos);
  }

  async function createTodo() {
    const res = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ todo }),
    });

    const data = await res.json();
    setTodos(data);
    setTodo("");
  }

  async function deleteTodo(todoItem) {
    const res = await fetch("http://localhost:8080/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: todoItem._id }),
    });

    const data = await res.json();
    setTodos(data);
  }

  async function checkTodo(todoItem) {
    const res = await fetch("http://localhost:8080/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: todoItem._id }),
    });

    const data = await res.json();
    setTodos(data);
  }

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <>
      <button onClick={logout}>Logout</button>

      {todos.length === 0 ? (
        <h3>No todos. Make one now!</h3>
      ) : (
        todos.map((item) => (
          <div key={item._id}>
            {item.title}
            <button onClick={() => checkTodo(item)}>
              {item.is_completed ? "❌" : "✅"}
            </button>
            <button onClick={() => deleteTodo(item)}>🗑️</button>
          </div>
        ))
      )}

      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Todo..."
      />
      <button onClick={createTodo}>Add Todo</button>
    </>
  );
}
