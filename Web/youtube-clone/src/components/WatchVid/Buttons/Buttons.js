import React, { useState } from "react";
import axios from "axios";
import styles from "./Buttons.module.css";

export default function Buttons({ currentVideo, setCurrentVideo, context, setContext }) {
  const handleAction = async (action) => {
    if (!context) {
      alert("Log in to perform actions");
      return;
    }

    try {
      const response = await axios.patch(`/api/users/${context._id}/videos/${currentVideo._id}`, {
        action: action,
        userId: context._id,
      });

      const { updatedVideo, updatedUser } = response.data;

      setCurrentVideo(updatedVideo);
      setContext(updatedUser);
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  const isLiked = context?.likedVideos.includes(currentVideo._id);
  const isDisliked = context?.dislikedVideos.includes(currentVideo._id);

  return (
    <div className={styles.buttonsWrapper}>
      <img
        src={currentVideo.user_image || "path/to/default/image.png"}
        alt="User profile"
        className={styles.profileImage}
      />
      <p className={styles.userName}>{currentVideo.user}</p>
      <div className={styles.likedDislikedWrapper}>
        <button className={styles.likedBtn} onClick={() => handleAction("like")}>
          <p className={styles.num}>{currentVideo.likes}</p>
          <i className={`${styles.liked} ${isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}`}></i>
        </button>
        <button className={styles.dislikedBtn} onClick={() => handleAction("dislike")}>
          <i className={`${styles.liked} ${isDisliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"}`}></i>
          <p className={styles.num}>{currentVideo.dislikes}</p>
        </button>
      </div>
      {context?._id === currentVideo.userId && (
        <button className={styles.shareButton} onClick={() => handleAction("delete")}>
          <i className={`${styles.liked} bi bi-trash`}></i>
        </button>
      )}
    </div>
  );
}

{
  /* <button className={styles.shareButton}>
        <i class="bi bi-share" className={styles.shareIcon}></i>
      </button> */
}
