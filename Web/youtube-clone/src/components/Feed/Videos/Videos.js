import React, { useState } from 'react'
import VideoShow from '../VideoShow/VideoShow'
import vid from '../../../data/videos.json'

export default function Videos() {
  const [videos, setVideos] = useState(vid)

  
  return (
    <div class="overflow-auto" id='container'>
      <div class="container" id='wrapper'>
        <div class="row">
          <div class="col">
            {videos.map((video) => {
            if((video.id-1)%3 === 0)
              return <VideoShow {...video} />
          })}
          </div>
          <div class="col">
          {videos.map((video) => {
            if((video.id-1)%3 === 1)
              return <VideoShow {...video} />
          })}
          </div>
          <div class="col">
          {videos.map((video) => {
            if((video.id-1)%3 === 2)
              return <VideoShow {...video} />
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
