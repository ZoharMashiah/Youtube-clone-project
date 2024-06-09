import React from 'react'
import ButtonField from '../ButtonField/ButtonField'
import styles from './Menu.module.css'

export default function Menu() {
  return (
    <div>
      <ButtonField text="Home" icon="bi bi-house-door" />
      <ButtonField text="Subscriptions" icon="bi bi-card-heading" />
    </div>
  )
}
