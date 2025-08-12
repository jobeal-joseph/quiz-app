// src/Register.jsx

import React, { useState } from "react";
import "./Login.css"; // You can reuse the same CSS file

function Register({ onSwitchToLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // To show success or error messages
const [isError, setIsError] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsError(false);

    // --- Frontend Validation ---
    if (password !== confirmPassword) {
    setIsError(true);
    setMessage("Passwords do not match.");
    return;
    }

    try {
    const response = await fetch('${import.meta.env.VITE_API_URL}/api/auth/register', {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to register.");
    }
    
      // On success
    setIsError(false);
    setMessage(data.message + " You can now log in.");

    } catch (err) {
    setIsError(true);
    setMessage(err.message);
    }
};

return (
    <div className="login-container">
    <h1 className="login-title">Create an Account</h1>

    <form onSubmit={handleSubmit} className="login-form">
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
        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="login-input"
        />
        <button type="submit" className="login-button">
        Register
        </button>
    </form>
    
      {/* Display success or error message */}
    {message && (
        <p className={isError ? "login-error" : "login-success"}>
            {message}
        </p>
    )}

    <p className="switch-form">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="switch-button">
        Login
        </button>
    </p>
    </div>
);
}

export default Register;