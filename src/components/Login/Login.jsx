import React from "react";
import "./Login.css";

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to Quiz App</h1>
      <p className="login-subtitle">Login to continue</p>
      <button className="google-login-btn" onClick={onLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1920px-Google_%22G%22_logo.svg.png"
          alt="Google icon"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default Login;
