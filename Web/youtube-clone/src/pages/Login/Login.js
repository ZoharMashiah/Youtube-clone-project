import React from 'react';
import './Login.css';
import Loginwrapper from '../../components/Login/Loginwrapper/Loginwrapper';
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png';

export default function Login() {
  return (
    <div className='login-page'>
      <img src={icon} id='logo' alt='Logo' />
        <p className='login-title'>Login</p>
        <Loginwrapper />
    </div>
  );
}