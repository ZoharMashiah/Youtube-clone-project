import React from 'react'
import Search from '../Search/Search'
import UpperButtons from '../UpperButtons/UpperButtons'
import LogoMenu from '../LogoMenu/LogoMenu'
import styles from './UpBar.module.css'

export default function UpBar({setsearchText, filterVideos,setcurrentVideo,setfilterdedVideos, videos}) {
  return (
    <div className={styles.wrapper}>
      <LogoMenu setcurrentVideo={setcurrentVideo} setfilterdedVideos={setfilterdedVideos} videos={videos}/>
      <div className={styles.searchWrraper}>
        <Search setsearchText={setsearchText} filterVideos={filterVideos} />
      </div>
      
      <div className={styles.upperButtonsWrraper}>
        <UpperButtons />
      </div>
    </div>
  )
}
