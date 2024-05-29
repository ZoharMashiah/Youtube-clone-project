import React from 'react'
import ButtonField from '../ButtonField/ButtonField'
import home from '../../../utilites/house-door.svg'
import sub from '../../../utilites/card-heading.svg'

export default function Menu() {
  return (
    <div>
      <ButtonField text="Home" icon={home} />
      <ButtonField text="Subscriptions" icon={sub} />
    </div>
  )
}
