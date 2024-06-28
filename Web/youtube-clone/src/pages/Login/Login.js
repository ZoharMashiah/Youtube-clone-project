
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Loginwrapper from '../../components/Login/Loginwrapper/Loginwrapper';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';

export default function Login({setcurrentUser, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      //change the localhost3000 to api.
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setcurrentUser(username); // Set the current user
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <button className='dark-mode-toggle' onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <img src={icon} id='logo' alt='Logo' />
      <p className='login-title'>Login</p>
      <Loginwrapper handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
    </div>
  );
}
