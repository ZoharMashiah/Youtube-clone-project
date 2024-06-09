import React from 'react'
import styles from './SugestedVideos.module.css'
import ShowVideoSugested from '../ShowVideoSugested/ShowVideoSugested'

export default function SugestedVideos({videos,currentVideo, setcurrentVideo}) {
  return (
    <div>
      <h3 className={styles.title}>More Videos</h3>
      {
        videos.map((video) => {
          if (video.id != currentVideo.id) {
            return <ShowVideoSugested video={video} setcurrentVideo={setcurrentVideo} />
          }
        })
      }
    </div>
  )
}
