import React, { useState } from 'react';
import './Loginwrapper.css';
import Userfield from '../Userfield/Userfield';

export default function Loginwrapper() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className='login-wrapper'>
      <div className='input-group'>
        <i className='fas fa-user icon'></i>
        <Userfield label='Username' settext={setUsername} />
      </div>
      <div className='input-group'>
        <i className='fas fa-lock icon'></i>
        <Userfield label='Password' settext={setPassword} />
      </div>
      <div className='remember-me'>
        <input
          type='checkbox'
          id='rememberMe'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor='rememberMe'>Remember me</label>
      </div>
      <div className='login-footer'>
        <p>Don't have an account? <a href='/Register'>Register</a></p>
      </div>
      <button className='register-button' onClick={() => console.log(username)}>Confirm</button>
    </div>
  );
}