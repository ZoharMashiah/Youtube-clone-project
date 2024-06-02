import React from 'react'
import "./Feed.css"
import LeftFeed from '../../components/Feed/LeftFeed/LeftFeed'
import RightFeed from '../../components/Feed/RightFeed/RightFeed'

export default function Feed() {
  return (
      <div className='Feed'>
          <div className='Right'>
            <RightFeed />
          </div>
          <div className='Left'>
            <LeftFeed />  
          </div>
    </div>
  )
}
