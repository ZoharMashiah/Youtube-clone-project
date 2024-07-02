import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import Loginwrapper from "../../components/Login/Loginwrapper/Loginwrapper";
import Logo from "../../components/Feed/Logo/Logo";
import AppContext from "../../AppContext";

export default function Login({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode, toggleDarkMode, currentUser } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      //change the localhost3000 to api.
      const response = await axios.post("api/tokens", { username, password });
      if (response.status == 200) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);

        console.log("Logged in as: ", currentUser);

        return user;
      } else {
        alert("Login failed: could not get user");
        console.log("Login failed: could not get user");
        return false;
      }
    } catch (error) {
      alert("Login failed", error.msg);
    }
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {/* <img src={icon} id="logo" alt="Logo" /> */}

      <Logo />
      <p className="login-title">Login</p>
      <Loginwrapper handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
    </div>
  );
}
