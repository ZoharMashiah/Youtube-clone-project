import React from 'react'
import './RightFeed.css'
import UpBar from '../UpBar/UpBar'
import Videos from '../Videos/Videos'
import Categories from '../Categories/Categories'

export default function RightFeed() {
  return (
    <div>
      <div className='upper'>
        <UpBar />
      </div>
      <div className='middle'>
        <Categories />
      </div>
      <div className='bottom'>
        <Videos />
      </div>
    </div>
  )
}
