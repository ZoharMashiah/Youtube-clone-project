import React from 'react'
import styles from './LogoMenu.module.css'
import Image from 'react-bootstrap/Image'

export default function LogoMenu({setcurrentVideo,setfilterdedVideos, videos}) {
  return (
    <div className={styles.imgContainer}>
      <button className={styles.button}>
        <i class="bi bi-list" id={styles.icon} ></i>
      </button>
      <Image src='utilites/Image.png' rounded width="100px" height="65px" className={styles.Image} onClick={() => {
        setcurrentVideo(0)
        setfilterdedVideos(videos)
      }}/>
    </div>
  )
}
