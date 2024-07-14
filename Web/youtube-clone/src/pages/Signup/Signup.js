import React, { useEffect, useContext } from "react";
import "./Signup.css";
import authAxios from "../../util/authAxios";
import Signupwrapper from "../../components/Signup/Signupwrapper/Signupwrapper";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Signup({}) {
  const { currentUser, darkMode } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("Logged in as: ", currentUser.username);
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignup = async (newUser) => {
    try {
      await authAxios.post("/api/users/signup", newUser);
      alert("Success!");

      return true;
    } catch (error) {
      const errorMessage =
        error.response?.status === 409
          ? "Username already exists. Please choose a different username."
          : "Signup failed. Please try again.";

      alert(errorMessage);
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
