import React, {useState} from 'react'
import styles from './UpperButtons.module.css'
import AddVideoPopup from '../../AddVideo/AddVideoPopup/AddVideoPopup'

export default function UpperButtons({settrigger,currentUser, setcurrentUser}) {
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.button}>
        <i class='bi bi-camera-reels' id={styles.icon} onClick={() => settrigger(true)}/>
      </button>
      <button className={styles.button}>
        <i class='bi bi-bell' id={styles.icon2}/>
      </button>
      <img onClick={()=>setcurrentUser(null)} src={currentUser.photo == null? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png":currentUser.photo} id={styles.profileImage} />
    </div>
  )
}
