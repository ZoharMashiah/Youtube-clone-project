import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './VideoShow.module.css'

export default function VideoShow({ icon, user, title, description, publication_date, video, views, user_image }) {
  let viewers = views > 999 ? views > 999999 ? (views / 1000000).toFixed(0) + "M" : (views / 1000).toFixed(0) + "K" : views
  let time = ((Date.now() - publication_date) / 60000).toFixed(0)
  let timeStr = time > 60? time > 1140?time>43200?time >525600? ((time/525600).toFixed(0) +" years ago"):((time/43200).toFixed(0) +" monthes ago"):((time/1140).toFixed(0) +" days ago"):((time/60).toFixed(0) +" hours ago"):(time +" minuets ago")
  return (
      <div className={styles.videoCard}>
        <Image src={icon} width="95%" height="72%" id={styles.videoImage} />
          <div className={styles.imageWrapper}>
              <Image src={user_image} width="40px" height="40px" roundedCircle />
            <div className={styles.titleWrapper}>
            <p id={styles.title}>{title}</p>
            <p id={styles.user}>{user}</p>
            <div>
              <p id={styles.views}>{viewers} views · {timeStr}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
