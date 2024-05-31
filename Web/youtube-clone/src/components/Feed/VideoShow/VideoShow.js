import React from 'react'
import { Image } from 'react-bootstrap'
import './VideoShow.css'

export default function VideoShow({ icon, user, title, description, publication_date, video, views, user_image }) {
  let viewers = views > 999 ? views > 999999 ? (views / 1000000) + "M" : (views / 1000) + "K" : views
  let time = ((Date.now() - publication_date) / 60000).toFixed(0)
  let timeStr = time > 60? time > 1140?time>43200?time >525600? (time/525600 +" years ago"):((time/43200).toFixed(0) +" monthes ago"):((time/1140).toFixed(0) +" days ago"):((time/60).toFixed(0) +" hours ago"):(time +" minuets ago")
  return (
      <div className='videoCard'>
        <Image src={icon} width="330px" height="165px"  id='videoImage'/>
        <div className='imageWrapper'>
          <Image src={user_image} width="40px" height="40px" roundedCircle />
          <div className='titleWrapper'>
            <p id="title">{title}</p>
            <p id="user">{user}</p>
            <div>
            <p id="views">{viewers} views · {timeStr}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
