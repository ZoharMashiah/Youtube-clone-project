import React from 'react'
import styles from './VideoDisplay.module.css'
import SugestedVideos from '../SugestedVideos/SugestedVideos'
import LeftVideoShow from '../LeftVideoShow/LeftVideoShow'

export default function VideoDisplay({currentVideo,editVideo,videos,setcurrentVideo, currentUser,likedPush, editComment, deleteComment, deleteVideo }) {
  return (
    <div className={styles.VideoDisplayWrapper}>
      <div className={styles.LeftVideoShowWrapper}>
        <LeftVideoShow currentVideo={currentVideo} editVideo={editVideo} videos={videos} currentUser={currentUser} likedPush={likedPush} editComment={editComment} deleteComment={deleteComment} deleteVideo={deleteVideo} />
      </div>
      <div className={styles.SugestedVideosWrapper}>
        <SugestedVideos videos={videos} currentVideo={currentVideo} setcurrentVideo={setcurrentVideo} />
      </div>
    </div>
  )
}
