import React, { useState } from 'react'
import Category from '../Category/Category'
import './Categories.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Categories() {

  const [categories, setCategories] = useState(["All", "Music", "Mixes", "JavaScript", "Gaming", "Bouldering", "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"])
  return (
    <div id='categoriesWrraper' class="overflow-auto">
      {
        categories.map((category) => {
          return <Category text={category} />
        })
      }
    </div>
  )
}
