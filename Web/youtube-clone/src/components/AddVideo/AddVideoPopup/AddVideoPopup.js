import React,{useState} from 'react'
import styles from './AddVideoPopup.module.css'
import Dropdown from 'react-bootstrap/Dropdown';

export default function AddVideoPopup({ trigger, currenUser, settrigger, setvideos, videos, setfilterdVideos,filterdedVideos}) {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [image, setimage] = useState(null)
  const [video, setvideo] = useState(null)
  const [category, setcategory] = useState("")

  const handleCancle = () => {
    settitle("")
    setdescription("")
    setimage(null)
    setvideo(null)
    setcategory("")
    settrigger(false)
  }

  const getMaxId = () => {
    let id = 0
    videos.map((video) => {
      if (video.id > id) {
        id = video.id
      }
    })
    return id
  }
  const handleAdd = () => {
    if(title.length > 0 && description.length > 0 && image != null && video != null && category.length > 0){
    let newVideo = {
      id: (getMaxId() + 1),
      title: title,
      description: description,
      user: currenUser.username,
      user_image: currenUser.photo,
      category: category,
      publication_date: Date.now(),
      icon: image,
      video: video,
      views: 0,
      comments: []
    }
      setvideos([...videos, newVideo])
      setfilterdVideos([...videos, newVideo])
    settitle("")
    setdescription("")
    setimage(null)
    setvideo(null)
    setcategory("")
      settrigger(false)
    }
    else {
      alert("Fill all the fileds!")
    }
  }


  return (trigger?(
    <div className={styles.AddVideoWrapper}>
      <div class="card" className={styles.AddVideoCard}>
        <h2>Add New Video</h2>
        <div>
          <input placeholder='Title' value={title} onChange={e => {settitle(e.target.value)}} />
          <input placeholder='Description' value={description} onChange={e => setdescription(e.target.value)} />
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {category === ""? "Category" : category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setcategory("Music")}>Music</Dropdown.Item>
              <Dropdown.Item onClick={() => setcategory("News")}>News</Dropdown.Item>
              <Dropdown.Item onClick={() => setcategory("Gaming")}>Gaming</Dropdown.Item>
              <Dropdown.Item onClick={() => setcategory("Sports")}>Sports</Dropdown.Item>
              <Dropdown.Item onClick={() => setcategory("Other")}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input type='file' placeholder='Upload Video' accept=".mp4" onChange={e => {
            let file = e.target.files[0]
            setvideo(URL.createObjectURL(file))
          }} />
          <input type='file' placeholder='Upload Photo' accept=".png, .jpeg, .jpg" onChange={e => {
            let file = e.target.files[0]
            setimage(URL.createObjectURL(file))
          }} />
          <div class="btn-group">
            <button class="btn btn-primary" className={styles.cancleBtn} onClick={handleCancle}>Cancle</button>
            <button class="btn btn-primary" className={styles.addBtn} onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  ):(""))
}
