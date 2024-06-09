import React from 'react'
import styles from './UpperVideo.module.css'
import Buttons from '../Buttons/Buttons'
import Description from '../Description/Description'

export default function UpperVideo({ currentVideo, likedPush,deleteVideo, currentUser }) {
  

  return (
    <div>
      <div class="embed-responsive embed-responsive-1by1  w-100" className={styles.videoPlayerWrapper}>
        <iframe class="embed-responsive-item" src={currentVideo.video} allowfullscreen className={styles.videoPlayer}></iframe>
      </div>
      <div className={styles.textWrapper}>
        <h2>{currentVideo.title}</h2>
        <Buttons currentVideo={currentVideo} likedPush={likedPush} deleteVideo={deleteVideo} currentUser={currentUser} />
        <Description currentVideo={currentVideo} />
      </div>
      
    </div>
  )
}
