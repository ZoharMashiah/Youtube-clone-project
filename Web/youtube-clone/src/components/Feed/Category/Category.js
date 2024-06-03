import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Category.module.css'

export default function Category({text, selected, onClick}) {
  return (
    <div>
      <Button id={selected?styles.selected:styles.category} onClick={onClick}>
        {text}
      </Button>
      
    </div>
  )
}
