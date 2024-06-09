import React, { useState } from 'react';
import './Signup.css';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';
import Signupwrapper from '../../components/Signup/Signupwrapper/Signupwrapper';

export default function Signup({ users, setusers, darkMode, setDarkMode }) {

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`Signup-page ${darkMode ? 'dark-mode' : ''}`}>
      <button className='dark-mode-toggle' onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Signupwrapper users={users} setusers={setusers} />
    </div>
  );
}