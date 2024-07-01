import React, { useState,useEffect, useContext } from 'react';
import './Signup.css';
import axios from 'axios';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';
import Signupwrapper from '../../components/Signup/Signupwrapper/Signupwrapper';
import AppContext from "../../AppContext";

export default function Signup({ }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const { darkMode, toggleDarkMode } = useContext(AppContext);

  const handleSignup = async (newUser) => {
    try {
      let res = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if (res.ok) {
      return true
      // Update state to login page
    } else {
      return false
    }
      // Update state to login page
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed', error);
    }
  };

  return (
    <div className={`Signup-page ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <Signupwrapper handleSignup={handleSignup} users = {users} />
    </div>
  );
}
