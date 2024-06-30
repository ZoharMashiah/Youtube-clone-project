import React, { useState } from "react";
import "./Login.css";
import Loginwrapper from "../../components/Login/Loginwrapper/Loginwrapper";
import icon from "../../components/Login/LoginImages/1716994828673_imgbg.net.png";
import Logo from "../../components/Feed/Logo/Logo";

export default function Login({ users, setContext, darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {/* <img src={icon} id="logo" alt="Logo" /> */}

      <Logo />
      <p className="login-title">Login</p>
      <Loginwrapper users={users} setContext={setContext} />
    </div>
  );
}
