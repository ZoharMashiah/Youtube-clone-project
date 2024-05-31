import React from 'react'
import './UpperButtons.css'

export default function UpperButtons() {
  return (
    <div className='buttonsWrapper'>
      <button className='button'>
        <img src='utilites/camera-reels.svg' />
      </button>
      <button className='button'>
        <img src='utilites/bell.svg' />
      </button>
      <img src='utilites/video2.png' id='profileImage'/>
    </div>
  )
}
