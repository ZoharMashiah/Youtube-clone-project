import React from 'react'
import styles from "./Feed.module.css"
import LeftFeed from '../../components/Feed/LeftFeed/LeftFeed'
import RightFeed from '../../components/Feed/RightFeed/RightFeed'

export default function Feed() {
  return (
      <div className={styles.Feed}>
          <div className={styles.Right}>
            <RightFeed />
          </div>
          <div className={styles.Left}>
            <LeftFeed />  
          </div>
    </div>
  )
}
