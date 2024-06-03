import React from 'react'
import styles from './UpperButtons.module.css'

export default function UpperButtons() {
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.button}>
        <i class='bi bi-camera-reels' id={styles.icon} />
      </button>
      <button className={styles.button}>
        <i class='bi bi-bell' id={styles.icon2}/>
      </button>
      <img src='utilites/video2.png' id={styles.profileImage} />
    </div>
  )
}
