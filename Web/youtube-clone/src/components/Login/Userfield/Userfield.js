import React from 'react';
import './Userfield.css';

export default function Userfield({ label, settext }) {
  return (
    <div className='userfield'>
      <input
        type={label.toLowerCase() === 'password' ? 'password' : 'text'}
        placeholder={label}
        onChange={(e) => settext(e.target.value)}
        className='input-field'
      />
    </div>
  );
}