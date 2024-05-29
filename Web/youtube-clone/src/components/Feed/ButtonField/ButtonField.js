import React from 'react'
import './ButtonField.css'

export default function ButtonField({icon, text}) {
  return (
      <div className='ButtonField'>
          <div className='svgContainer'>
            <img src={icon} width="20px" height="20px"/>
          </div>
        <p>{text}</p>
    </div>
  )
}
