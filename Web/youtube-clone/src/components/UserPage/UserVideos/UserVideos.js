import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './UserVideo.module.css'
import VideoShow from '../../Feed/VideoShow/VideoShow';

export default function UserVideos({userId}) {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
            const res = await fetch(`/api/users/${userId}/videos`)
            const data = await res.json()
            setVideoList(data)
        }
        fetchVideos()
    }, [])
  const navigate = useNavigate()
    const handleClick = (video, videoList) => {
      console.log("clicked a video");
      navigate(`/users/${video.user._id}/videos/${video._id}`, {replace: true});
    };
  return (
      <div style={{ textAlign: "center" }}>
          <div className={styles.grid}>
              {videoList.map((video) => (
                <div key={video._id}>
                  <VideoShow {...video} onClick={() => handleClick(video)}/>
                </div>
              ))}
            </div>
    </div>
  )
}
