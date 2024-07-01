import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginwrapper.css";
import Userfield from "../Userfield/Userfield";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppContext from "../../../AppContext";

export default function Loginwrapper() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("userlist: ", userList);
    const user = userList.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        setCurrentUser(user);
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("Username does not exist.");
    }
  };

  // since state updates are batched, navigate only after the current user is set
  useEffect(() => {
    if (currentUser) {
      console.log("logged in as: ", currentUser);
      navigate("/");
    }
  }, [currentUser, navigate]);

  // creating the admin here until the db is up and running
  useEffect(() => {
    createAdmin();
  }, []);
  const createAdmin = () => {
    const admin = {
      _id: "6680ea618a9e992cd65322df",
      username: "admin",
      firstName: "admin",
      middleName: "admin",
      lastName: "admin",
      password: "admin",
      birthdate: "1990-05-15",
      photo: "https://example.com/photos/john_doe.jpg",
      videos: ["6680174737cf5a681ee7dda5", "60d5ecb8b4f6a12345678902"],
    };

    setUserList((prevUsers) => {
      if (!prevUsers.some((user) => user.username === admin.username)) {
        return [...prevUsers, admin];
      }
      return prevUsers;
    });
  }; // end creation here

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
        <p>Don't have an account?</p>
        <button id="register-button" onClick={() => navigate("/signup")}>
          <p>Register</p>
        </button>
      </div>
      <button className="confirm-button" onClick={handleSubmit}>
        Confirm
      </button>
    </div>
  );
}
