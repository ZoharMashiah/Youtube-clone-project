import React from 'react'
import styles from './Description.module.css'

export default function Description({currentVideo}) {
  let viewers = currentVideo.views > 999 ? currentVideo.views > 999999 ? (currentVideo.views / 1000000).toFixed(0) + "M" : (currentVideo.views / 1000).toFixed(0) + "K" : currentVideo.views
  let time = ((Date.now() - currentVideo.publication_date) / 60000).toFixed(0)
  let timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600).toFixed(0) + " years ago") : ((time / 43200).toFixed(0) + " monthes ago") : ((time / 1140).toFixed(0) + " days ago") : ((time / 60).toFixed(0) + " hours ago") : (time + " minuets ago")

  return (
    <div className={styles.descriptionWrapper}>
      <p className={styles.views}>{viewers} views · {timeStr}</p>
      <p className={styles.description}>{currentVideo.description}</p>
    </div>
  )
}
