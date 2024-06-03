import React from 'react'
import styles from './Comment.module.css'

export default function Comment({ id, title, user, date, icon }) {
  let time = ((Date.now() - date) / 60000).toFixed(0)
  let timeStr = time > 60? time > 1140?time>43200?time >525600? ((time/525600).toFixed(0) +" years ago"):((time/43200).toFixed(0) +" monthes ago"):((time/1140).toFixed(0) +" days ago"):((time/60).toFixed(0) +" hours ago"):(time +" minuets ago")

  return (
    <div className={styles.commentWrapper}>
      <img src={icon} className={styles.profileImage} />
      <div>
        <div className={styles.user}>
          <h6 className={styles.user}>{user}</h6>
          <h6 className={styles.time}>{timeStr}</h6>
        </div>
        <p>{title}</p>
      </div>
    </div>
  )
}
