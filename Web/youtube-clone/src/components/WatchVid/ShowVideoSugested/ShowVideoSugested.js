import React from 'react'
import styles from './ShowVideoSugested.module.css'

export default function ShowVideoSgested({ setcurrentVideo, video }) {
  let viewers = video.views > 999 ? video.views > 999999 ? (video.views / 1000000).toFixed(0) + "M" : (video.views / 1000).toFixed(0) + "K" : video.views
  let time = ((Date.now() - video.publication_date) / 60000).toFixed(0)
  let timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600).toFixed(0) + " years ago") : ((time / 43200).toFixed(0) + " monthes ago") : ((time / 1140).toFixed(0) + " days ago") : ((time / 60).toFixed(0) + " hours ago") : (time + " minuets ago")
  
  return (
    <div className={styles.videoWrapper}>
      <img src={video.icon} className={styles.videoImage} onClick={() => setcurrentVideo(video.id)}/>
      <div  className={styles.textWrapper}>
        <p className={styles.title} onClick={() => setcurrentVideo(video.id)}>{video.title}</p>
        <p className={styles.user}>{video.user}</p>
        <p className={styles.views}>{viewers} views · {timeStr}</p>
      </div>
    </div>
  )
}
