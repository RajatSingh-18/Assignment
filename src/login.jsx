import React, { useState } from "react";
import logo from "./Images/9225b8bc-2f93-4304-84d9-0868a6f62ca3 4.png";
import User from "./Images/Ellipse 33.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("Rachelsaket89");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login details:", username, password);
  };

  return (
    <div className="login-container">
      <img src={logo} className="logo" alt="App Logo" />
      <div className="content-container">
        <div className="leftside">
          <img src={User} alt="userimage" />
        </div>
        <div className="rightside">
          <h1>Welcome back....</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <button type="submit" onClick={navigate("/dashboard")}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
