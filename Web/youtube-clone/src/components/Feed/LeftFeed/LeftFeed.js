import React from 'react'
import './LeftFeed.css'
import LogoMenu from '../LogoMenu/LogoMenu'
import Menu from '../Menu/Menu'
import YouInfo from '../YouInfo/YouInfo'
import Subscribers from '../Subscribers/Subscribers'
import Explore from '../Explore/Explore'
import More from '../More/More'

export default function LeftFeed() {
  return (
    <div className='LeftFeed'>
      <LogoMenu />
      <div className='Scrollable'>
        <Menu />
        {/* <hr className='hr'/>
        <YouInfo /> */}
        <hr className='hr'/>
        <Subscribers />
        <hr className='hr'/>
        <Explore />
        <hr className='hr'/>
        <More/>
      </div>
      
    </div>
  )
}
