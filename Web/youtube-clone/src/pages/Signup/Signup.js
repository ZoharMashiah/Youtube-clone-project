import React from 'react'
import './Signup.css'
import icon from '../../components/Login/LoginImages/1716994828673_imgbg.net.png'
import Signupwrapper from '../../components/Signup/Signupwrapper/Signupwrapper'

export default function Signup() {
  return (
    <div className='Signup-page'>
        <img src={icon} id='logo' alt='Logo' />
        <p className='sign-title'>Signup</p>
        <Signupwrapper/>
    </div>
  )
}
