import React, { useEffect, useState, useContext } from "react";
import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function Comments({ currentVideo }) {
  const { currentUser } = useContext(AppContext);
  const { userId, videoId } = useParams();
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [triger, setTriger] = useState(false);

  const addCommentToVideo = async (e) => {
    e.preventDefault();
    const comment = {
      title: title,
      user: {
        _id: currentUser._id,
        username: currentUser.username,
        photo: currentUser.photo,
      },
    };
    const response = await fetch(`/api/users/${userId}/videos/${videoId}/comments/`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setTitle("");
      setTriger(true);
      console.log("new comment added", json);
    } else {
      alert(response.error);
    }
  };

  const orgenizeComments = (id) => {
    let orgenizeCommen = comments.map((comment) => {
      if (comment.parentId === id) {
        return (
          <div style={{ position: "relative", left: "3vw" }} className={styles.commentWrapper}>
            <Comment {...comment} currentUser={currentUser} triger={triger} setTriger={setTriger} />
            {orgenizeComments(comment._id)}
          </div>
        );
      }
    });
    return orgenizeCommen;
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/users/${userId}/videos/${videoId}/comments/`);
      const json = await response.json();

      if (response.ok) {
        setComments(json);
        setTriger(false);
      }
    };

    fetchComments();
  }, [triger]);

  return (
    <div className={styles.commentsWrapper}>
      <h4>{currentVideo.comments.length} Comments</h4>
      <form className={styles.addCommentWrapper} onSubmit={addCommentToVideo}>
        <button
          type="submit"
          className={title.length === 0 ? styles.buttonDisabled : styles.button}
          disabled={title.length === 0}
          onClick={() => addCommentToVideo()}
        >
          Post
        </button>
        <input
          placeholder="Add Comment"
          type="text"
          value={title}
          onChange={(e) => {
            if (currentUser != null) setTitle(e.target.value);
            else alert("You need to login to write a comment");
          }}
        />
        <img src={currentUser.photo} alt="User Profile" className={styles.profileImage} />
      </form>
      {comments &&
        comments.map((comment) => {
          if (comment.parentId == undefined) {
            return (
              <div>
                <Comment {...comment} currentUser={currentUser} triger={triger} setTriger={setTriger} />
                {orgenizeComments(comment._id)}
              </div>
            );
          }
        })}
    </div>
  );
}
