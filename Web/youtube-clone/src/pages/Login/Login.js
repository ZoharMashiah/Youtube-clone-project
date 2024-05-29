import React from 'react'
import './Login.css'
import UserField from '../../components/userField/UserField'
import Entrybutton from '../../components/Entrybutton/Entrybutton'
import { Link } from 'react-router-dom'
import Title from '../../components/Title/Title'
import Textbox from '../../components/Textbox/Textbox'

function Login() {
    return (
        <div className='Login'>
        <div>
            <Title type= "Login"/>
            <div className="input-box"> 
            <Textbox type = {"Username"} />
             </div>
            <div className="input-box"> 
            <Textbox type ={"Password"}/>
 </div>
            <Entrybutton type="Login"/>
            </div>
  <div className="remember-forgot">
    <label><input type="checkbox" />Remember me</label>
            </div>
            <p>Don't have an account? <a href= "">Register</a></p>
        </div>
    )
}
export default Login;