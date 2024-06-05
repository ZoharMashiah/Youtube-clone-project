import React,{useState} from 'react'
import styles from './Comment.module.css'

export default function Comment({ id, title, user, date, icon, currentUser,editComment, deleteComment }) {
  const [edit, setedit] = useState(false)
  const [editedTitle, seteditedTitle] = useState(title)
  let time = ((Date.now() - date) / 60000).toFixed(0)
  let timeStr = time > 60? time > 1140?time>43200?time >525600? ((time/525600).toFixed(0) +" years ago"):((time/43200).toFixed(0) +" monthes ago"):((time/1140).toFixed(0) +" days ago"):((time/60).toFixed(0) +" hours ago"):(time +" minuets ago")

  return (
    <div className={styles.commentWrapper}>
      <img src={icon} className={styles.profileImage} />
      <div>
        <div className={styles.user}>
          <h6 className={styles.user}>{user}</h6>
          <h6 className={styles.time}>{timeStr}</h6>
        </div>
        {currentUser?.username === user ? 
          !edit ? 
            <div className={styles.titleWrapper}>
              <p>{title}</p>
              <button onClick={() => setedit(true)} className={styles.edit}>
                <i class="bi bi-pencil" className={styles.editIcon}></i>
              </button>
              <button onClick={() => deleteComment(id)} className={styles.remove} >
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
              <button onClick={() => {
                let com = {
                  id: id,
                  title: editedTitle,
                  user: user,
                  date: date,
                  icon: icon
                }
                editComment(com)
                setedit(false)
              }} className={styles.save}>
                save
              </button>
            </div>
        : <p>{title}</p>}
      </div>
    </div>
  )
}
