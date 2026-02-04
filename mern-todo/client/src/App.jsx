import React, { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch("http://localhost:8080/get_all");
      const data = await res.json();
      setTodos(data.todos);
    }

    fetchTodos();
  }, []);

  async function createTodo() {
    const res = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });

    const data = await res.json();
    setTodos(data);
  }

  async function deleteTodo(e) {
    const res = await fetch("http://localhost:8080/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e._id }),
    });

    const data = await res.json();

    setTodos(data);
  }

  async function checkTodo(e) {
    const res = await fetch("http://localhost:8080/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e._id }),
    });

    const data = await res.json();
    setTodos(data);
  }

  return (
    <>
      {todos.length === 0 ? (
        <h3>No todos. Make one now!</h3>
      ) : (
        todos.map((todo_item) => (
          <div key={todo_item._id}>
            {todo_item.title}{" "}
            <button
              onClick={() => {
                checkTodo(todo_item);
              }}
            >
              {todo_item.is_completed ? "❌" : "✅"}
            </button>
            <button
              onClick={() => {
                deleteTodo(todo_item);
              }}
            >
              🗑️
            </button>
          </div>
        ))
      )}

      <input
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        placeholder="Todo..."
      />
      <button
        onClick={() => {
          createTodo();
        }}
      >
        Make todo
      </button>
    </>
  );
}

export default App;
