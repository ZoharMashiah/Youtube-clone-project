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
        <div class="row">
          <div class="col">
            {videos.map((video) => {
                if (i < (videos.length / 3)) {
                  i++
                  return <VideoShow {...video} onClick={() => handleClick(video.id)} />
                }
                else if (i === videos.length - 1)
                  i = 0
                else
                  i++
            })}
          </div>
          <div class="col">
            {videos.map((video) => {
                if (i >= (videos.length / 3) && i < 2*(videos.length / 3)) {
                  i++
                  return <VideoShow {...video} onClick={() => handleClick(video.id)} />
                }
                else if (i === videos.length - 1)
                  i = 0
                else
                  i++
              })}
          </div>
          <div class="col">
              {videos.map((video) => {
                if (i >= 2*(videos.length / 3) && i < 3*(videos.length / 3)) {
                  i++
                  return <VideoShow {...video} onClick={() => handleClick(video.id)} />
                }
                else if (i === videos.length - 1)
                  i = 0
                else
                  i++
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
