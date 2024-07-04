import React, { useState, useEffect, useContext } from "react";
import "./Signup.css";
import axios from "axios";
import Signupwrapper from "../../components/Signup/Signupwrapper/Signupwrapper";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Signup({}) {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("Logged in as: ", currentUser);
      navigate("/");
    } else {
      console.log("Logged in as: ", currentUser);

      navigate("/");
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [currentUser, navigate]);

  const { darkMode } = useContext(AppContext);

  const handleSignup = async (newUser) => {
    try {
      let res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        return true;
        // Update state to login page
      } else {
        return false;
      }
      // Update state to login page
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed", error);
    }
  };

  return (
    <div className={`Signup-page ${darkMode ? "dark-mode" : ""}`}>
      <DarkModeButton style={"dark-mode-toggle"} />
      <DarkModeButton style={"dark-mode-toggle"} />
      <Signupwrapper handleSignup={handleSignup} users={users} />
    </div>
  );
}
