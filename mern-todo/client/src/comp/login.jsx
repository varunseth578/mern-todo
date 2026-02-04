import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistered ? "register" : "login";

    try {
      const res = await axios.post(
        `http://localhost:8080/${endpoint}`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistered ? "Sign Up" : "Login"}</h2>

      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {isRegistered ? "Register" : "Login"}
      </button>

      <p onClick={() => setIsRegistered(!isRegistered)}>
        {isRegistered
          ? "Already have an account?"
          : "Create new account"}
      </p>
    </form>
  );
}
