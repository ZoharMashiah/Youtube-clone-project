import React, { useContext } from "react";
import "./Login.css";
import Loginwrapper from "../../components/Login/Loginwrapper/Loginwrapper";
import icon from "../../components/Login/LoginImages/1716994828673_imgbg.net.png";
import Logo from "../../components/Feed/Logo/Logo";
import AppContext from "../../AppContext";

export default function Login() {
  const { darkMode, toggleDarkMode } = useContext(AppContext);
  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {/* <img src={icon} id="logo" alt="Logo" /> */}

      <Logo />
      <p className="login-title">Login</p>
      <Loginwrapper />
    </div>
  );
}
