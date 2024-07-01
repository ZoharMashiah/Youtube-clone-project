import React, { useState, useEffect } from 'react'
import styles from './UserVideo.module.css'
import VideoShow from '../../Feed/VideoShow/VideoShow';

export default function UserVideos() {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const userId = "60d5ecb54b24d1a810c4ca1c"
            const res = await fetch(`http://localhost:3000/api/videos`)
            const data = await res.json()
            setVideoList(data)
        }
        fetchVideos()
    },[])
  return (
      <div style={{ textAlign: "center" }}>
          <div className={styles.grid}>
              {videoList.map((video) => (
                <div key={video._id}>
                  <VideoShow {...video} />
                </div>
              ))}
            </div>
    </div>
  )
}
