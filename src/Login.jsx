import React from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google"

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to Quiz App</h1>
      <p className="login-subtitle">Login to continue</p>
      <button onClick={onLogin}></button>
      <GoogleLogin onSuccess={onLogin} onError={() => console.log("shit don't work")}></GoogleLogin>
    </div>
  );
}

export default Login;
