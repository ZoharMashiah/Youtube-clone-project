import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function Comments({ currentVideo, currentUser, editComment, deleteComment }) {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { creatorId, videoId } = useParams();
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [triger, setTriger] = useState(false);

  // const getMaxId = () => {
  //   let id = 0;
  //   currentVideo.comments.map((com) => {
  //     if (com.id > id) id = com.id;
  //   });
  //   return id;
  // };
  const addCommentToVideo = async (e) => {
    e.preventDefault();
    const comment = {
      title: title,
      userId: currentUser._id,
    };

    const response = await fetch(`api/users/${creatorId}/video/${videoId}/comment/`, {
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
      console.log(response.error);
    }
  };

  const orgenizeComments = (id) => {
    let orgenizeCommen = comments.map((comment) => {
      if (comment.parentId === id) {
        return (
          <div style={{ position: "relative", left: "3vw" }}>
            <Comment
              {...comment}
              currentUser={currentUser}
              editComment={editComment}
              deleteComment={deleteComment}
              triger={triger}
              setTriger={setTriger}
            />
            {orgenizeComments(comment._id)}
          </div>
        );
      }
    });
    return orgenizeCommen;
  };

  useEffect(() => {
    const fetchComments = async () => {
      // temp
      const userId = "667aeb3eaf98ca2e75104d0b";
      const videoId = "667aeb3eaf98ca2e75104d0b";

      const response = await fetch(`api/users/${userId}/video/${videoId}/comment/`);
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
          //onClick={() => addCommentToVideo(addComment)}
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
        <img src={userData.photo} alt="User Profile" className={styles.profileImage} />
      </form>
      {comments &&
        comments.map((comment) => {
          if (comment.parentId == undefined) {
            return (
              <div>
                <Comment
                  {...comment}
                  currentUser={currentUser}
                  editComment={editComment}
                  deleteComment={deleteComment}
                  triger={triger}
                  setTriger={setTriger}
                />
                {orgenizeComments(comment._id)}
              </div>
            );
          }
        })}
    </div>
  );
}
