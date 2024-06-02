import React, { useState } from 'react';
import './Signupwrapper.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h2 className='signup-title'>Register</h2>
        <form>
          <div className='input-group'>
            <i className='fas fa-user icon'></i>
            <input 
              type='text' 
              placeholder='Username *' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-user icon'></i>
            <input 
              type='text' 
              placeholder='First name *' 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-user icon'></i>
            <input 
              type='text' 
              placeholder='Middle name' 
              value={middleName} 
              onChange={(e) => setMiddleName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-user icon'></i>
            <input 
              type='text' 
              placeholder='Last name *' 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-lock icon'></i>
            <input 
              type='password' 
              placeholder='Password *' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-lock icon'></i>
            <input 
              type='password' 
              placeholder='Confirm Password *' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='input-field' 
            />
          </div>
          <div className='input-group'>
            <i className='fas fa-calendar-alt icon'></i>
            <input 
              type='date' 
              placeholder='Birth date' 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)}
              className='input-field' 
            />
          </div>
          <button type='submit' className='submit-button'>Submit</button>
        </form>
        <a href='/login' className='return-login'>Return to login</a>
      </div>
    </div>
  );
}