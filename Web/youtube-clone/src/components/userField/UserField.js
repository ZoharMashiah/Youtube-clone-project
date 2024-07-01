import React from 'react';
import './UserField.css';

export default function UserField({ label, setText }) {
  return (
    <div className='UserField'>
      <p>{label}</p>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />
    </div>
  );
}