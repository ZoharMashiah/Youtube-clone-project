import React from 'react'
import ButtonField from '../ButtonField/ButtonField'

export default function Explore() {
  return (
    <div>
      <ButtonField text="Trending" icon="utilites/fire.svg" />
      <ButtonField text="Music" icon="utilites/music-note.svg" />
      <ButtonField text="Gaming" icon="utilites/controller.svg" />
      <ButtonField text="News" icon="utilites/newspaper.svg" />
      <ButtonField text="Sports" icon="utilites/trophy.svg" />
      <ButtonField text="Podcasts" icon="utilites/broadcast-pin.svg" />
    </div>
  )
}
