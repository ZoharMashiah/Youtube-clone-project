import React from 'react'
import Search from '../Search/Search'
import UpperButtons from '../UpperButtons/UpperButtons'
import './UpBar.css'

export default function UpBar() {
  return (
    <div className='wrapper'>
      <div className='searchWrraper'>
        <Search />
      </div>
      
      <div className='upperButtonsWrraper'>
        <UpperButtons />
      </div>
    </div>
  )
}
