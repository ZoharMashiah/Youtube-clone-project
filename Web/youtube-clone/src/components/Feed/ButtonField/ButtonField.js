import React from 'react'
import styles from './ButtonField.module.css'

export default function ButtonField({icon, text}) {
  return (
    <div className={styles.ButtonField}>
      <div className={styles.svgContainer}>
            <i class={icon} id={styles.icon}></i>
          </div>
        <p>{text}</p>
    </div>
  )
}
