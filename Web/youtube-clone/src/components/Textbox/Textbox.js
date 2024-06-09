import React from 'react'

export default function Textbox({type}) {
  return (
    <div><input type= "text" placeholder={type} required/></div>
  )
}

