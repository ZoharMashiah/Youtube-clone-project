import React from 'react'
import Search from '../Search/Search'
import UpperButtons from '../UpperButtons/UpperButtons'
import './UpBar.css'

export default function UpBar({setsearchText, filterVideos}) {
  return (
    <div className='wrapper'>
      <div className='searchWrraper'>
        <Search setsearchText={setsearchText} filterVideos={filterVideos} />
      </div>
      
      <div className='upperButtonsWrraper'>
        <UpperButtons />
      </div>
    </div>
  )
}
