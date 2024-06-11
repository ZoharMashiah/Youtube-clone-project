import React, { useState } from 'react'
import VideoShow from '../VideoShow/VideoShow'
import vid from '../../../data/videos.json'
import styles from './Videos.module.css'

export default function Videos({videos, setcurrentVideo}) {

  const handleClick = (video) => {
    setcurrentVideo(video)
  }
  let i = 0;
  return (
    <div id={styles.container}>
      <div id={styles.wrapper}>
        <div className={styles.grid}>
            {videos.map((video) => {
                
                  return <div><VideoShow {...video} onClick={() => handleClick(video.id)} /></div>
            })
            }
        </div>
      </div>
    </div>
  )
}
