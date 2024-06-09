import React from 'react'
import ButtonField from '../ButtonField/ButtonField'
import styles from './Explore.module.css'

export default function Explore() {
  return (
    <div>
      <ButtonField text="Trending" icon="bi bi-fire" />
      <ButtonField text="Music" icon="bi bi-music-note" />
      <ButtonField text="Gaming" icon="bi bi-controller" />
      <ButtonField text="News" icon="bi bi-newspaper" />
      <ButtonField text="Sports" icon="bi bi-trophy" />
      <ButtonField text="Podcasts" icon="bi bi-broadcast-pin" />
    </div>
  )
}
