// src/UserDetails.jsx
import React, { useState } from 'react';
import './Login.css'; // Reuse styles

function UserDetails({ user, onDetailsSubmit }) {
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/update-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, name, rollno }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update details.');
      }

      // On success, pass the updated user data back to App.jsx
      onDetailsSubmit(data.user);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome!</h1>
      <p className="login-subtitle">Please enter your details to continue.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Save and Continue
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export default UserDetails;