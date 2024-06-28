import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';
import Signupwrapper from '../../components/Signup/Signupwrapper/Signupwrapper';

export default function Signup({ users, setusers, darkMode, setDarkMode }) {

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignup = async (newUser) => {
    try {
      await axios.post('http://localhost:3000/api/users/signup', newUser);
      // Update state or redirect to login page
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  return (
    <div className={`Signup-page ${darkMode ? 'dark-mode' : ''}`}>
      <button className='dark-mode-toggle' onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Signupwrapper handleSignup={handleSignup}  />
    </div>
  );
}