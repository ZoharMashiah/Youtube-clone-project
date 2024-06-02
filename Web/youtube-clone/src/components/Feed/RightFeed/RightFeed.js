import React, {useState} from 'react'
import styles from './RightFeed.module.css'
import UpBar from '../UpBar/UpBar'
import Videos from '../Videos/Videos'
import Categories from '../Categories/Categories'
import vid from '../../../data/videos.json'

export default function RightFeed() {
  const [selectedCategory, setselectedCategory] = useState("All")
  const [videos, setVideos] = useState(vid)
  const [filterdedVideos, setfilterdedVideos] = useState(videos)
  const [searchText, setsearchText] = useState("")

  const filterVideos = () => {
    let id = 1
    let arr = []
    videos.filter((video) => {
      if (video.title.toLowerCase().includes(searchText.toLowerCase())) {
        let changedVideo = {
          id: id,
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
        id += 1
      }
    })
    setfilterdedVideos(arr)
  }

  return (
    <div>
      <div className={styles.upper}>
        <UpBar setsearchText={setsearchText} filterVideos={filterVideos} />
      </div>
      <div className={styles.middle}>
        <Categories selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} />
      </div>
      <div className={styles.bottom}>
        <Videos videos={filterdedVideos}/>
      </div>
    </div>
  )
}
