
import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import Loginwrapper from '../../components/Login/Loginwrapper/Loginwrapper';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';
import Logo from "../../components/Feed/Logo/Logo";
import AppContext from "../../AppContext";

export default function Login({setcurrentUser, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      //change the localhost3000 to api.
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      if(response.status == 200){
        localStorage.setItem('token', response.data.token);
        setcurrentUser(username); // Set the current user
        return true;
      } else {
        alert('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const { darkMode, toggleDarkMode } = useContext(AppContext);

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
