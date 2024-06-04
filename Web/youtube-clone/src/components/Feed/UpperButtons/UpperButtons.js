import React, {useState} from 'react'
import styles from './UpperButtons.module.css'
import AddVideoPopup from '../../AddVideo/AddVideoPopup/AddVideoPopup'

export default function UpperButtons({settrigger}) {
  
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.button}>
        <i class='bi bi-camera-reels' id={styles.icon} onClick={() => settrigger(true)}/>
      </button>
      <button className={styles.button}>
        <i class='bi bi-bell' id={styles.icon2}/>
      </button>
      <img src='utilites/video2.png' id={styles.profileImage} />
    </div>
  )
}
