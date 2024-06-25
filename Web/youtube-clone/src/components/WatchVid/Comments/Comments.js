import React, {useState} from 'react'
import styles from './Comments.module.css'
import Comment from '../Comment/Comment'

export default function Comments({ currentVideo, editVideo, videos, currentUser, editCurrent,editComment, deleteComment }) {
  const [addComment, setAddComment] = useState("")

  const getMaxId = () => {
    let id = 0
    currentVideo.comments.map((com) => {
      if (com.id > id)
        id = com.id
    })
    return id
  }
  const addCommentToVideo = (comment) => {
    let addedComment = {
      id: (getMaxId() + 1),
      title: comment,
      user: currentUser.username,
      date: Date.now(),
      icon: currentUser.photo == null? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png":currentUser.photo
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
      like: currentVideo.like,
      dislike: currentVideo.dislike,
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
        <input placeholder='Add Comment' value={addComment} onChange={e => {
          if (currentUser != null)
            setAddComment(e.target.value)
          else
            alert('You need to login to write a comment')
        }} />
        <img src={currentUser?.photo == null? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png":currentUser.photo} className={styles.profileImage} />
      </div>
      {
        currentVideo.comments.map((comment) => {
          return <Comment {...comment} currentUser={currentUser} editComment={editComment} deleteComment={deleteComment} />
        })
      }
    </div>
  )
}
