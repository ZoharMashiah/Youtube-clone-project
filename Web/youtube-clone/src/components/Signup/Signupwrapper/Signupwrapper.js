import React, { useState } from "react";
import "./Signupwrapper.css";
import { Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppContext from "../../../AppContext";

export default function Signupwrapper() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [moveLogin, setmoveLogin] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleSubmit = () => {
    // Username validation
    if (userList.some((user) => user.username === username)) {
      alert("Username already exists.");
      return;
    }

    // Password validation
    const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
    const digitCount = (password.match(/\d/g) || []).length;

    if (password.length < 8 || letterCount < 2 || digitCount < 2) {
      alert("Password must contain at least 2 letters and 2 digits, and be at least 8 characters long.");
      return;
    }

    // Birthdate validation
    if (new Date(birthDate) > new Date()) {
      alert("Birthdate must be in the past.");
      return;
    }

    // If all validations pass
    let newUser = {
      username: username,
      password: password,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthDate: birthDate,
      photo: photo,
    };
    setUserList([...userList, newUser]);
    setSuccess(true);
  };

  if (success || moveLogin) return <Navigate to="/login" />;

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Register</h2>
        <form>
          <div className="input-group">
            <i className="bi bi-person-circle"></i>
            <input
              type="text"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="First name *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="Middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="Last name *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-calendar"></i>
            <input
              type="date"
              placeholder="Birth date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <i className="bi bi-upload"></i>
            <input
              accept=".png, .jpg, .jpeg"
              type="file"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              className="input-field"
            />
          </div>
          <button type="button" className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <a className="return-login" onClick={() => setmoveLogin(true)}>
          Return to login
        </a>
      </div>
    </div>
  );
}
