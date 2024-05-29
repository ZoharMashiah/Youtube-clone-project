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
        <YouInfo />
        <Subscribers />
        <Explore />
        <More/>
      </div>
      
    </div>
  )
}
