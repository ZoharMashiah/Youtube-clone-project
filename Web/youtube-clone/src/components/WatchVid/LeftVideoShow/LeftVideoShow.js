import React from 'react'
import styles from './LeftVideoShow.module.css'
import UpperVideo from '../UpperVideo/UpperVideo'
import Comments from '../Comments/Comments'

export default function LeftVideoShow({currentVideo,editVideo, videos}) {
  return (
    <div className={styles.LeftVideoShowWrapper}>
      <div className={styles.UpperVideoWrapper}>
        <UpperVideo currentVideo={currentVideo} />
      </div>
      <div className={styles.CommentsWrapper}>
        <Comments currentVideo={currentVideo} editVideo={editVideo} videos={videos} />
      </div>
    </div>
  )
}
