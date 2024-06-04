import React, {useState} from 'react'
import styles from './Comments.module.css'
import Comment from '../Comment/Comment'

export default function Comments({ currentVideo, editVideo }) {
  const [addComment, setAddComment] = useState("")

  const addCommentToVideo = (comment) => {
    let addedComment = {
      id: (currentVideo.comments.length + 1),
      title: comment,
      user: "Baz Caz",
      date: Date.now(),
      icon: "utilites/video1.png"
    }
    let changedVideo = {
      id: currentVideo.id,
      title: currentVideo.title,
      description: currentVideo.description,
      user: currentVideo.user,
      user_image: currentVideo.user_image,
      category: currentVideo.category,
      publication_date: currentVideo.publication_date,
      icon: currentVideo.icon,
      video: currentVideo.video,
      views: currentVideo.views,
      comments: [...currentVideo.comments,addedComment]
    }
    setAddComment("")
    editVideo(changedVideo)
  }

  return (
    <div className={styles.commentsWrapper}>
      <h4>{currentVideo.comments.length}  Comments</h4>
      <div className={styles.addCommentWrapper}>
        <button className={addComment.length===0? styles.buttonDisabled : styles.button} disabled={addComment.length===0} onClick={()=>addCommentToVideo(addComment)}>Post</button>
        <input placeholder='Add Comment' value={addComment} onChange={e => setAddComment(e.target.value)} />
        <img src='utilites/video2.png' className={styles.profileImage} />
      </div>
      {
        currentVideo.comments.map((comment) => {
          return <Comment {...comment} />
        })
      }
    </div>
  )
}
