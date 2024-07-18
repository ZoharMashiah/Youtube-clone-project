import React, { useState, useContext } from "react";
import styles from "./Comment.module.css";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import authAxios from "../../../util/authAxios";

export default function Comment({ _id, user, title, date, setTriger }) {
  const { currentUser } = useContext(AppContext);
  const { userId, videoId } = useParams();
  const [edit, setedit] = useState(false);
  const [editedTitle, seteditedTitle] = useState(title);
  const [reply, setreply] = useState(false);
  const [replyText, setreplyText] = useState("");
  let time = ((Date.now() - date) / 60000).toFixed(0);
  let timeStr =
    time > 60
      ? time > 1140
        ? time > 43200
          ? time > 525600
            ? (time / 525600).toFixed(0) + " years ago"
            : (time / 43200).toFixed(0) + " months ago"
          : (time / 1140).toFixed(0) + " days ago"
        : (time / 60).toFixed(0) + " hours ago"
      : time + " minutes ago";

  const navigate = useNavigate();

  const deleteComment = async () => {
    const { data } = await authAxios.delete(`/api/users/${userId}/videos/${videoId}/comments/${_id}`);
    if (data) setTriger(true);
  };

  const handleReply = async () => {
    const comment = {
      title: replyText,
      user: {
        _id: currentUser._id,
        username: currentUser.username,
        photo: currentUser.photo,
      },
    };
    try {
      await authAxios.post(`/api/users/${userId}/videos/${videoId}/comments/${_id}`, comment);
      setreplyText("");
      setreply(false);
      setTriger(true);
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async () => {
    const comment = { title: editedTitle };
    try {
      await authAxios.patch(`/api/users/${userId}/videos/${videoId}/comments/${_id}`, comment);
      setTriger(true);
      setedit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getToUserPage = () => {
    navigate(`/userpage/${currentUser._id}`);
  };

  return (
    <div className={styles.commentWrapper}>
      <img src={user.photo} className={styles.profileImage} onClick={getToUserPage} />
      <div className={styles.body}>
        <div>
          <h6 className={styles.user} onClick={getToUserPage}>
            {user.username}
          </h6>
          <p>{title}</p>

          <h6 className={styles.time}>{timeStr}</h6>
          <div>
            <div>
              {!reply ? (
                <p
                  className={styles.reply}
                  onClick={() => {
                    if (currentUser != null) setreply(true);
                    else alert("You need to login to write a comment");
                  }}
                >
                  Reply
                </p>
              ) : (
                <div className={styles.titleWrapper}>
                  <input value={replyText} onChange={(e) => setreplyText(e.target.value)} className={styles.editText} />
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => {
                        setreplyText("");
                        setreply(false);
                      }}
                      button
                      className={styles.button}
                    >
                      Cancel
                    </button>
                    <button onClick={handleReply} className={styles.button}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {currentUser && currentUser._id === user._id ? (
            !edit ? (
              <div className={styles.buttonContainer}>
                <button onClick={() => setedit(true)} className={styles.button}>
                  <i class="bi bi-pencil"></i>
                </button>
                <button onClick={() => deleteComment()} className={styles.button}>
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            ) : (
              <div className={styles.titleWrapper}>
                <input
                  value={editedTitle}
                  onChange={(e) => seteditedTitle(e.target.value)}
                  className={styles.editText}
                />
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => {
                      seteditedTitle(title);
                      setedit(false);
                    }}
                    className={styles.button}
                  >
                    Cancel
                  </button>
                  <button onClick={editComment} className={styles.button}>
                    Save
                  </button>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
