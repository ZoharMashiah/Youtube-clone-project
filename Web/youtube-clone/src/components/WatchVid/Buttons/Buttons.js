import React, { useState, useContext } from "react";
import styles from "./Buttons.module.css";
import { AppContext } from "../../../AppContext";
import authAxios from "../../../util/authAxios";

export default function Buttons({ currentVideo }) {
  const { currentUser } = useContext(AppContext);
  const [numLike, setNumLike] = useState(currentVideo.like);
  const [numDislike, setNumDislike] = useState(currentVideo.dislike);
  const [isLiked, setIsLiked] = useState(currentUser?.likes.includes(currentVideo._id));
  const [isDisliked, setIsDisliked] = useState(currentUser?.dislikes.includes(currentVideo._id));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAction = async (action) => {
    if (!currentUser) {
      alert("You must log in to react");
      return;
    }
    const body = {
      action,
      userId: currentUser?._id,
    };
    if (action == "like") {
      if (isLiked) {
        setIsLiked(false);
        setNumLike(numLike - 1);
      } else {
        if (isDisliked) {
          setIsDisliked(false);
          setNumDislike(numDislike - 1);
        }
        setIsLiked(true);
        setNumLike(numLike + 1);
      }
    } else if (action == "dislike") {
      if (isDisliked) {
        setIsDisliked(false);
        setNumDislike(numDislike - 1);
      } else {
        if (isLiked) {
          setIsLiked(false);
          setNumLike(numLike - 1);
        }
        setIsDisliked(true);
        setNumDislike(numDislike + 1);
      }
    }
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000);
    await authAxios.post(`/api/users/${currentVideo.user._id}/videos/${currentVideo._id}/action`, body);
  };

  return (
    <div className={styles.buttonsWrapper}>
      <button disabled={isButtonDisabled} className={styles.likedBtn} onClick={() => handleAction("like")}>
        <i className={`${styles.liked} ${isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}`}></i>
        <p className={styles.num}>{numLike || 0}</p>
      </button>
      <button disabled={isButtonDisabled} className={styles.dislikedBtn} onClick={() => handleAction("dislike")}>
        <i className={`${styles.liked} ${isDisliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"}`}></i>
        <p className={styles.num}>{numDislike || 0}</p>
      </button>
    </div>
  );
}
