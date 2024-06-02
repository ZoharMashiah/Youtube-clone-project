import React from 'react'
import Search from '../Search/Search'
import UpperButtons from '../UpperButtons/UpperButtons'
import styles from './UpBar.module.css'

export default function UpBar({setsearchText, filterVideos}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrraper}>
        <Search setsearchText={setsearchText} filterVideos={filterVideos} />
      </div>
      
      <div className={styles.upperButtonsWrraper}>
        <UpperButtons />
      </div>
    </div>
  )
}
