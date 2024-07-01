import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import Loginwrapper from "../../components/Login/Loginwrapper/Loginwrapper";
import icon from "../../components/Login/LoginImages/1716994828673_imgbg.net.png";
import Logo from "../../components/Feed/Logo/Logo";
import AppContext from "../../AppContext";

export default function Login({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode, toggleDarkMode, currentUser } = useContext(AppContext);

  const handleLogin = async (setCurrentUser) => {
    try {
      //change the localhost3000 to api.
      const response = await axios.post("http://localhost:3000/api/tokens", { username, password });
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        setCurrentUser(response.data.user); // Set the current user
        while (currentUser === null);
        console.log(currentUser);
        alert("current user", currentUser);
        return true;
      } else {
        alert("Login failed now");
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
