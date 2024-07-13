import React, { useEffect, useState, useContext } from "react";
import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import authAxios from "../../../util/authAxios";

export default function Comments({ currentVideo }) {
  const { currentUser } = useContext(AppContext);
  const { userId, videoId } = useParams();
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(false);

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
    try {
      await authAxios.post(`/api/users/${userId}/videos/${videoId}/comments/`, comment);
      setTitle("");
      setTrigger(true);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const orgenizeComments = (id) => {
    let organizeComment = comments.map((comment) => {
      if (comment.parentId === id) {
        return (
          <div style={{ marginLeft: "30px" }} className={styles.commentWrapper}>
            <Comment {...comment} currentUser={currentUser} triger={trigger} setTriger={setTrigger} />
            {orgenizeComments(comment._id)}
          </div>
        );
      }
    });
    return organizeComment;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await authAxios.get(`/api/users/${userId}/videos/${videoId}/comments/`);
        setComments(response.data);
        setTrigger(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [trigger]);

  return (
    <div className={styles.commentsWrapper}>
      <h4>{currentVideo.comments.length} Comments</h4>
      <form className={styles.addCommentWrapper} onSubmit={addCommentToVideo}>
        <button
          type="submit"
          className={title.length === 0 ? styles.buttonDisabled : styles.button}
          disabled={title.length === 0}
          onClick={(e) => addCommentToVideo(e)}
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
        {currentUser ? <img src={currentUser.photo} alt="User Profile" className={styles.profileImage} /> : ""}
      </form>
      {comments &&
        comments.map((comment) => {
          if (comment.parentId == undefined) {
            return (
              <div>
                <Comment {...comment} currentUser={currentUser} triger={trigger} setTriger={setTrigger} />
                {orgenizeComments(comment._id)}
              </div>
            );
          }
        })}
    </div>
  );
}
