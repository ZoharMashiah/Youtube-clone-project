import React, {useState} from 'react'
import styles from './Buttons.module.css'

export default function Buttons({currentVideo,likedPush, deleteVideo, currentUser}) {
  const [liked, setliked] = useState(false)
  const [disliked, setdisliked] = useState(false)
  const [likeNumber, setlikeNumber] = useState(currentVideo.like)
  const [dislikeNumber, setdislikeNumber] = useState(currentVideo.dislike)
  return (
    <div className={styles.buttonsWrapper}>
      <img src={currentVideo.user_image===null? 'utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png': currentVideo.user_image} className={styles.profileImage} />
      <p className={styles.userName}>{currentVideo.user}</p>
      <div className={styles.likedDislikedWrapper}>
        <button className={styles.likedBtn} onClick={() => {
          if (liked){
            setlikeNumber(likeNumber - 1)}
          else if (!liked && disliked) {
            setlikeNumber(likeNumber + 1)
            setdislikeNumber(dislikeNumber - 1)
          } else{
            setlikeNumber(likeNumber + 1)}
          setliked(!liked)
          setdisliked(false)
        }}>
          <p className={styles.num}>{likeNumber}</p>
          <i class={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} className={styles.liked}></i>
        </button>
        <button className={styles.dislikedBtn} onClick={() => {
          if (disliked){
            setdislikeNumber(dislikeNumber - 1)}
          else if (!disliked && liked) {
            setlikeNumber(likeNumber - 1)
            setdislikeNumber(dislikeNumber + 1)
          } else{
          setdislikeNumber(dislikeNumber + 1)}
          setliked(false)
          setdisliked(!disliked)
        }}>
          <i class={disliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} className={styles.liked}></i>
          <p className={styles.num}>{dislikeNumber}</p>
          </button>
      </div>
      {/* <button className={styles.shareButton}>
        <i class="bi bi-share" className={styles.shareIcon}></i>
      </button> */}
      { currentUser?.username === currentVideo.user &&
        <button className={styles.shareButton} onClick={() => {
          deleteVideo(currentVideo.id)
      }}>
        <i class="bi bi-trash" className={styles.liked}></i>
      </button> }
    </div>
  )
}
