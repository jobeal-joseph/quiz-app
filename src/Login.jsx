import React from "react";
import { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google"

function Login({ onLogin, onSwitchToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   // Handler for form submission
  const handleEmailLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If server responds with an error (e.g., 400), throw it
        throw new Error(data.message || "Failed to login.");
      }

      // If login is successful, call the onLogin prop from App.jsx
      onLogin(data.user);

    } catch (err) {
      // Catch errors and display them to the user
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to Quiz App</h1>
      <p className="login-subtitle">Login to continue</p>

      <form onSubmit={handleEmailLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}


      
      <p className="switch-form">
        Don't have an account?{" "}
        <button onClick={onSwitchToRegister} className="switch-button">
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
