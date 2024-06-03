import React from 'react'
import styles from './LeftFeed.module.css'
import Menu from '../Menu/Menu'
import YouInfo from '../YouInfo/YouInfo'
import Subscribers from '../Subscribers/Subscribers'
import Explore from '../Explore/Explore'
import More from '../More/More'

export default function LeftFeed() {
  return (
    <div className={styles.LeftFeed}>
      <div className={styles.Scrollable}>
        <Menu />
        {/* <hr className={styles.hr}/>
        <YouInfo /> */}
        <hr className={styles.hr} />
        <Subscribers />
        <hr className={styles.hr}/>
        <Explore />
        <hr className={styles.hr}/>
        <More/>
      </div>
      
    </div>
  )
}
