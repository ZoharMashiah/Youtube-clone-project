import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginwrapper.css";
import Userfield from "../Userfield/Userfield";
import "bootstrap-icons/font/bootstrap-icons.css";
import {AppContext} from "../../../AppContext";

export default function Loginwrapper({ handleLogin, setUsername, setPassword }) {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let user = await handleLogin(); // Call handleLogin from props
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // since state updates are batched, navigate only after the current user is set
  useEffect(() => {
    if (currentUser && !isLoading) {
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);

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
      <button className="confirm-button" onClick={async () => await handleSubmit()}>
        Confirm
      </button>
    </div>
  );
}
