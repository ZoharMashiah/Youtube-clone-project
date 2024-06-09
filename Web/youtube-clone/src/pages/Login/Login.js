import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>StreamBox</h1>
      <form>
        <div className="input-group">
          <label htmlFor="Username">Username</label>
          <input type="Username" id="Username" placeholder="Enter your Username" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="Confirm">Login</button>
      </form>
    </div>
  );
};

export default Login;