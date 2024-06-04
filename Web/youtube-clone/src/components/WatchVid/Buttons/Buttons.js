import React, {useState} from 'react'
import styles from './Buttons.module.css'

export default function Buttons({currentVideo}) {
  const [liked, setliked] = useState(false)
  const [disliked, setdisliked] = useState(false)
  return (
    <div className={styles.buttonsWrapper}>
      <img src={currentVideo.user_image===null? 'utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png': currentVideo.user_image} className={styles.profileImage} />
      <p className={styles.userName}>{currentVideo.user}</p>
      <div className={styles.likedDislikedWrapper}>
        <button className={styles.likedBtn} onClick={() => {
          setliked(!liked)
          setdisliked(false)
        }}>
          <i class={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} className={styles.liked}></i>
        </button>
        <button className={styles.dislikedBtn} onClick={() => {
          setliked(false)
          setdisliked(!disliked)
        }}>
            <i class={disliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} className={styles.liked}></i>
          </button>
      </div>
      {/* <button className={styles.shareButton}>
        <i class="bi bi-share" className={styles.shareIcon}></i>
      </button> */}
    </div>
  )
}
