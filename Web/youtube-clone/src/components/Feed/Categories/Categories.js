import React, { useState } from 'react'
import Category from '../Category/Category'
import styles from './Categories.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Categories({selectedCategory, setselectedCategory, filterVideosCategory}) {

  const [categories, setCategories] = useState(["All", "Music", "Mixes", "JavaScript", "Gaming", "Bouldering", "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"])

  const onClickHandle = (category) => {
    setselectedCategory(category)
    filterVideosCategory(category)
  }
  return (
    <div id={styles.categoriesWrraper} class="overflow-auto">
      {
        categories.map((category) => {
          if(category === selectedCategory)
            return <Category text={category} selected={true} onClick={()=>onClickHandle(category)} />
          else
            return <Category text={category} selected={false} onClick={()=>onClickHandle(category)} />
        })
      }
    </div>
  )
}
