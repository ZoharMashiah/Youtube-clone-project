import React from 'react'
import styles from './LowerFeed.module.css'
import RightFeed from '../RightFeed/RightFeed'
import LeftFeed from '../LeftFeed/LeftFeed'

export default function LowerFeed({selectedCategory, setselectedCategory, filterdedVideos, setcurrentVideo}) {
  return (
    <div className={styles.Feed}>
          <div className={styles.Right}>
        <RightFeed selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} filterdedVideos={filterdedVideos} setcurrentVideo={setcurrentVideo} />
          </div>
          <div className={styles.Left}>
            <LeftFeed />  
          </div>
    </div>
  )
}
