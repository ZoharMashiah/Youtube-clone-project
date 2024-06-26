import React,{useState} from 'react'
import styles from './Comment.module.css'

export default function Comment({ _id, id, title, user, date, icon, currentUser, triger, setTriger}) {
  const [edit, setedit] = useState(false)
  const [editedTitle, seteditedTitle] = useState(title)
  let time = ((Date.now() - date) / 60000).toFixed(0)
  let timeStr = time > 60? time > 1140?time>43200?time >525600? ((time/525600).toFixed(0) +" years ago"):((time/43200).toFixed(0) +" monthes ago"):((time/1140).toFixed(0) +" days ago"):((time/60).toFixed(0) +" hours ago"):(time +" minuets ago")

  const deleteComment = async () => {
    const userId = "667aeb3eaf98ca2e75104d0b"
      const videoId = "667aeb3eaf98ca2e75104d0b"

    const response = await fetch(`http://localhost:3000/api/users/${userId}/video/${videoId}/comment/${_id}`, {
        method: 'DELETE',
      })
      const json = await response.json()

      if (response.ok) {
        setTriger(true)
      }
  }

  const editComment = async () => {
    const userId = "667aeb3eaf98ca2e75104d0b"
    const videoId = "667aeb3eaf98ca2e75104d0b"
    
    const comment = {title: editedTitle}

    const response = await fetch(`http://localhost:3000/api/users/${userId}/video/${videoId}/comment/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      const json = await response.json()

      if (response.ok) {
        setTriger(true)
        setedit(false)
      }
  }
  

  return (
    <div className={styles.commentWrapper}>
      <img src={icon} className={styles.profileImage} />
      <div>
        <div className={styles.user}>
          <h6 className={styles.user}>{user}</h6>
        </div>
        {currentUser && currentUser.username === "admin" ? 
          !edit ? 
            <div className={styles.titleWrapper}>
              <p>{title}</p>
              <button onClick={() => setedit(true)} className={styles.edit}>
                <i class="bi bi-pencil" className={styles.editIcon}></i>
              </button>
              <button onClick={() => deleteComment()} className={styles.remove} >
                <i class="bi bi-trash" className={styles.editIcon}></i>
              </button>
            </div>
            : <div className={styles.titleWrapper}>
              <input value={editedTitle} onChange={e => seteditedTitle(e.target.value)} className={styles.editText} />
              <button onClick={() => {
                seteditedTitle(title)
                setedit(false)
              }} className={styles.cancle}>
                Cancle
              </button>
              <button onClick={editComment} className={styles.save}>
                save
              </button>
            </div>
          : <p>{title}</p>}
        <h6 className={styles.time}>{timeStr}</h6>
      </div>
    </div>
  )
}
