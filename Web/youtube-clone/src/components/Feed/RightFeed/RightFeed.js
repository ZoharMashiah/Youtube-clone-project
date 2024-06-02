import React, {useState} from 'react'
import styles from './RightFeed.module.css'
import UpBar from '../UpBar/UpBar'
import Videos from '../Videos/Videos'
import Categories from '../Categories/Categories'


export default function RightFeed({selectedCategory, setselectedCategory, filterdedVideos,setcurrentVideo}) {

  return (
    <div>
      <div className={styles.middle}>
        <Categories selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} />
      </div>
      <div className={styles.bottom}>
        <Videos videos={filterdedVideos} setcurrentVideo={setcurrentVideo} />
      </div>
    </div>
  )
}
