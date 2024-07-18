import React, { useEffect, useContext } from "react";
import authAxios from "../../util/authAxios";
import Signupwrapper from "../../components/Signup/Signupwrapper/Signupwrapper";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Signup({}) {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("Logged in as: ", currentUser.username);
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignup = async (newUser) => {
    try {
      await authAxios.post("/api/users", newUser);
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
    <div className="signupContainer">
      <div className="darkModeBtnSignup">
        <DarkModeButton />
      </div>
      <div className="signupWrapper">
        <Signupwrapper handleSignup={handleSignup} />
      </div>
    </div>
  );
}
