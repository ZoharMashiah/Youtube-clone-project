import React, { useState, useEffect, useContext } from "react";
import "./Signup.css";
import authAxios from "../../util/authAxios";
import Signupwrapper from "../../components/Signup/Signupwrapper/Signupwrapper";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Signup({}) {
  const [setUsers] = useState([]);
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("Logged in as: ", currentUser.username);
      navigate("/");
    }

    const fetchUsers = async () => {
      try {
        const response = await authAxios.get("/api/users");
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
      await authAxios.post("/api/users/signup", newUser);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed", error);
      return false;
    }
  };

  return (
    <div className={`Signup-page ${darkMode ? "dark-mode" : ""}`}>
      <DarkModeButton style={"dark-mode-toggle"} />
      <Signupwrapper handleSignup={handleSignup} />
    </div>
  );
}
