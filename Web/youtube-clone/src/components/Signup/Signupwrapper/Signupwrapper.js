import React, { useState } from 'react';
import './Signupwrapper.css';
import { Navigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Signupwrapper({ users, setusers}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (username && password && firstName && lastName) {
      const newUser = {
        username: username,
        password: password,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        birthDate: birthDate,
      };
      setusers([...users, newUser]);
      setSuccess(true);
    } else {
      alert('Please fill in all required fields');
    }
  }

  if (success) 
    return (<Navigate to='/' />);

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h2 className='signup-title'>Register</h2>
        <form>
          <div className='input-group'>
            <i className='bi bi-person-circle'></i>
            <input 
              type='text' 
              placeholder='Username *' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-person'></i>
            <input 
              type='text' 
              placeholder='First name *' 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-person'></i>
            <input 
              type='text' 
              placeholder='Middle name' 
              value={middleName} 
              onChange={(e) => setMiddleName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-person'></i>
            <input 
              type='text' 
              placeholder='Last name *' 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-lock'></i>
            <input 
              type='password' 
              placeholder='Password *' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-lock'></i>
            <input 
              type='password' 
              placeholder='Confirm Password *' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='bi bi-calendar'></i>
            <input 
              type='date' 
              placeholder='Birth date' 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)}
              className='input-field' 
            />
          </div>
          <button type='button' className='submit-button' onClick={handleSubmit}>Submit</button>
        </form>
        <a href='/login' className='return-login'>Return to login</a>
      </div>
    </div>
  );
}