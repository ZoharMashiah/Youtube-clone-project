import React, {useState} from 'react'
import styles from "./Feed.module.css"
import UpBar from '../../components/Feed/UpBar/UpBar'
import LowerFeed from '../../components/Feed/LowerFeed/LowerFeed'
import vid from '../../data/videos.json'
import VideoDisplay from '../../components/WatchVid/VideoDisplay/VideoDisplay'

export default function Feed() {
  const [selectedCategory, setselectedCategory] = useState("All")
  const [videos, setVideos] = useState(vid)
  const [filterdedVideos, setfilterdedVideos] = useState(videos)
  const [searchText, setsearchText] = useState("")
  const [currentVideo, setcurrentVideo] = useState(0)

  const filterVideos = () => {
    let arr = []
    videos.filter((video) => {
      if (video.title.toLowerCase().includes(searchText.toLowerCase())) {
        let changedVideo = {
          id: video.id,
          title: video.title,
          description: video.description,
          user: video.user,
          user_image: video.user_image,
          category: video.category,
          publication_date: video.publication_date,
          icon: video.icon,
          video: video.video,
          views: video.views,
          comments: video.comments
        }
        arr.push(changedVideo)
      }
    })
    setcurrentVideo(0)
    setfilterdedVideos(arr)
  }

  const editVideo = (video) => {
    let id = video.id
    let arr = []
    videos.map((vid) => {
      if (vid.id === id) {
        console.log(video)
        arr.push(video)
      } else {
        arr.push(vid)
      }
    })
    setVideos(arr)
    setfilterdedVideos(arr)
  }

  return (
      <div className={styles.Feed}>
          <div className={styles.Up}>
            <UpBar setsearchText={setsearchText} filterVideos={filterVideos} setcurrentVideo={setcurrentVideo} setfilterdedVideos={setfilterdedVideos} videos={videos} />
          </div>
          <div className={styles.Low}>{
            currentVideo === 0?
          <LowerFeed selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} filterdedVideos={filterdedVideos} setcurrentVideo={setcurrentVideo} /> :
          <VideoDisplay currentVideo={videos[currentVideo - 1]} editVideo={editVideo} videos={videos} setcurrentVideo={setcurrentVideo} />
            }  
          </div>
    </div>
  )
}
