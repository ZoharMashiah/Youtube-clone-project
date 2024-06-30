import React, { useContext } from "react";
import "./Signup.css";
import icon from "../../components/Login/LoginImages/1716994828673_imgbg.net.png";
import Signupwrapper from "../../components/Signup/Signupwrapper/Signupwrapper";
import AppContext from "../../AppContext";

export default function Signup() {
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <div className={`Signup-page ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <Signupwrapper />
    </div>
  );
}
