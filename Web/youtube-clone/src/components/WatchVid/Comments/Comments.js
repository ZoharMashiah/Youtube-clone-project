import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import Comment from "../Comment/Comment";

export default function Comments({
  currentVideo,
  editVideo,
  videos,
  currentUser,
  editCurrent,
  editComment,
  deleteComment,
}) {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [triger, setTriger] = useState(false);

  const getMaxId = () => {
    let id = 0;
    currentVideo.comments.map((com) => {
      if (com.id > id) id = com.id;
    });
    return id;
  };
  const addCommentToVideo = async (e) => {
    e.preventDefault();
    console.log("fsfs");
    const comment = {
      title: title,
      userId: "667aeb3eaf98ca2e75104d0b",
    };

    // temp
    const userId = "667aeb3eaf98ca2e75104d0b";
    const videoId = "667aeb3eaf98ca2e75104d0b";

    const response = await fetch(`http://localhost:3000/api/users/${userId}/video/${videoId}/comment/`, {
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
    // let addedComment = {
    //   id: getMaxId() + 1,
    //   title: comment,
    //   user: currentUser.username,
    //   date: Date.now(),
    //   icon:
    //     currentUser.photo == null
    //       ? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
    //       : currentUser.photo,
    // };
    // let changedVideo = {
    //   id: currentVideo.id,
    //   title: currentVideo.title,
    //   description: currentVideo.description,
    //   user: currentVideo.user,
    //   user_image: currentVideo.user_image,
    //   category: currentVideo.category,
    //   publication_date: currentVideo.publication_date,
    //   icon: currentVideo.icon,
    //   video: currentVideo.video,
    //   views: currentVideo.views,
    //   like: currentVideo.like,
    //   dislike: currentVideo.dislike,
    //   comments: [...currentVideo.comments,addedComment]
    // }
    // editVideo(changedVideo)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {

  //     const comment = { title: title }

  //   // temp
  //     const userId = "667aeb3eaf98ca2e75104d0b"
  //     const videoId = "667aeb3eaf98ca2e75104d0b"

  //     const address = `http://localhost:3000/api/users/${userId}/video/${videoId}/comment/`;
  //     const res = await fetch(address, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(comment),
  //     });

  //     const data = await res.json();
  //     alert(data.error);

  //     if (!res.ok) {
  //       console.log("Full response:", res);
  //       console.log("Sending request to:", address);
  //       throw new Error(`HTTP error. status: ${res.status}`);
  //     }

  //     alert("Upload is successful!");
  //   } catch (error) {
  //     console.error("Error adding video:", error);
  //     alert("Failed to add video. Please try again.");
  //   }
  // };

  useEffect(() => {
    const fetchComments = async () => {
      // temp
      const userId = "667aeb3eaf98ca2e75104d0b";
      const videoId = "667aeb3eaf98ca2e75104d0b";

      const response = await fetch(`http://localhost:3000/api/users/${userId}/video/${videoId}/comment/`);
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
        <img
          src={
            currentUser?.photo == null
              ? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
              : currentUser.photo
          }
          className={styles.profileImage}
        />
      </form>
      {comments &&
        comments.map((comment) => {
          return (
            <Comment
              {...comment}
              currentUser={currentUser}
              editComment={editComment}
              deleteComment={deleteComment}
              triger={triger}
              setTriger={setTriger}
            />
          );
        })}
    </div>
  );
}
