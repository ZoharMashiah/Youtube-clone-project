import React, { useState } from "react";
import "./Loginwrapper.css";
import Userfield from "../Userfield/Userfield";
import { Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Loginwrapper({ users, setContext }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [move, setMove] = useState(false);
  const [goFeed, setgoFeed] = useState(false);

  const handleSubmit = () => {
    const user = users.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        setgoFeed(true);
        setContext(user);
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("Username does not exist.");
    }
  };

  if (move) {
    return <Navigate to="/signup" />;
  }
  if (goFeed) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-wrapper">
      <div className="input-group">
        <i className="bi bi-person-circle"></i>
        <Userfield label="Username" settext={setUsername} />
      </div>
      <div className="input-group">
        <i className="bi bi-lock"></i>
        <Userfield label="Password" settext={setPassword} />
      </div>
      <div className="login-footer">
        <p>
          Don't have an account? <button onClick={() => setMove(true)}>Register</button>
        </p>
      </div>
      <button className="register-button" onClick={handleSubmit}>
        Confirm
      </button>
    </div>
  );
}
