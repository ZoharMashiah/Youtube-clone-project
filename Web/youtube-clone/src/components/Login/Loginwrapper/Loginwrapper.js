import React, { useState, useEffect, useContext } from "react";
import "./Loginwrapper.css";
import Userfield from "../Userfield/Userfield";
import { Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppContext from "../../../AppContext";

export default function Loginwrapper() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleSubmit = () => {
    const user = userList.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        setLoggedIn(true);
        setCurrentUser(user);
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("Username does not exist.");
    }
  };

  useEffect(() => {
    createFakeUser();
  }, []);
  const createFakeUser = () => {
    const fakeUser = {
      id: 89,
      username: "admin",
      password: "admin",
      firstName: "Test",
      middleName: "",
      lastName: "User",
      birthDate: "1990-01-01",
      photo: "",
    };

    setUserList((prevUsers) => {
      if (!prevUsers.some((user) => user.username === fakeUser.username)) {
        return [...prevUsers, fakeUser];
      }
      return prevUsers;
    });
  };

  if (register) {
    return <Navigate to="/signup" />;
  }

  if (loggedIn) {
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
          Don't have an account?{" "}
          <button id="register-button" onClick={() => setRegister(true)}>
            Register
          </button>
        </p>
      </div>
      <button className="confirm-button" onClick={handleSubmit}>
        Confirm
      </button>
    </div>
  );
}
