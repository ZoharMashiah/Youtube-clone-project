import React, { useState, useContext } from 'react'
import Category from '../Category/Category'
import styles from './Categories.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContext } from '../../../AppContext'
import axios from 'axios'

export default function Categories({ }) {
  const {setVideoList, selectedCategory, setSelectedCategory} = useContext(AppContext)

  const [categories, setCategories] = useState(["All", "Music", "Mixes", "JavaScript", "Gaming", "Bouldering", "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"])

  const onClickHandle = async (category) => {
    setSelectedCategory(category)
    if(category != "All"){
    const res = await fetch("/api/videos/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        search: false,
        text: category
      })
    })
    setVideoList(await res.json())
    } 
    else {
      const res = await axios.get("/api/videos");
      const videoList = res.data;
      console.log("video list: ", videoList);
      setVideoList(videoList);
    }
    
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
