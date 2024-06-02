import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Category.css'

export default function Category({text, selected, onClick}) {
  return (
    <div>
      <Button id={selected?'selected':'category'} onClick={onClick}>
        {text}
      </Button>
      
    </div>
  )
}
