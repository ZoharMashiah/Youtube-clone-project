import React from 'react'
import './LogoMenu.css'
import logo from '../../../utilites/Image.png'
import Image from 'react-bootstrap/Image'

export default function LogoMenu() {
  return (
    <div className='imgContainer'>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <Image src={logo} rounded width="100px" height="65px" className='Image' />
    </div>
  )
}
