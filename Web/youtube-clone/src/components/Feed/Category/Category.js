import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Category.css'

export default function Category({text}) {
  return (
    <div>
      <Button id='category'>
        {text}
      </Button>
      
    </div>
  )
}
