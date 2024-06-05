import React from 'react'
import styles from './LeftVideoShow.module.css'
import UpperVideo from '../UpperVideo/UpperVideo'
import Comments from '../Comments/Comments'

export default function LeftVideoShow({currentVideo,editVideo, videos, currentUser,likedPush,editComment,deleteComment, deleteVideo }) {
  return (
    <div className={styles.LeftVideoShowWrapper}>
      <div className={styles.UpperVideoWrapper}>
        <UpperVideo currentVideo={currentVideo} likedPush={likedPush} deleteVideo={deleteVideo} currentUser={currentUser} />
      </div>
      <div className={styles.CommentsWrapper}>
        <Comments currentVideo={currentVideo} editVideo={editVideo} videos={videos} currentUser={currentUser} editComment={editComment} deleteComment={deleteComment} />
      </div>
    </div>
  )
}
