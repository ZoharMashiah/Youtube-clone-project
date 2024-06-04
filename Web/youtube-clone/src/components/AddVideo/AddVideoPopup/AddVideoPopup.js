import React,{useState} from 'react'
import styles from './AddVideoPopup.module.css'
import Dropdown from 'react-bootstrap/Dropdown';

export default function AddVideoPopup({ trigger, currenUser, settrigger }) {
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

  const handleAdd = () => {
    settitle("")
    setdescription("")
    setimage(null)
    setvideo(null)
    setcategory("")
    settrigger(false)
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
              <Dropdown.Item href="#/action-1" onClick={() => setcategory("Music")}>Music</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() => setcategory("News")}>News</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() => setcategory("Gaming")}>Gaming</Dropdown.Item>
              <Dropdown.Item href="#/action-4" onClick={() => setcategory("Sports")}>Sports</Dropdown.Item>
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
          {image != null && (
            <img src={image} />
          )}
          <div class="btn-group">
            <button class="btn btn-primary" className={styles.cancleBtn} onClick={handleCancle}>Cancle</button>
            <button class="btn btn-primary" className={styles.addBtn} onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  ):(""))
}
