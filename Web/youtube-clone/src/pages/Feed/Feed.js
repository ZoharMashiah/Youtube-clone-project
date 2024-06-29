import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import UpBar from "../../components/Feed/UpBar/UpBar";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Feed({ currentUser, setcurrentUser, videos, setVideos }) {
  const [searchText, setsearchText] = useState("");
  const [currentVideo, setcurrentVideo] = useState(0);
  const [trigger, settrigger] = useState(false);
  const [gotologin, setgotologin] = useState(false);
  const [context, setContext] = useState(null);

  // not mine

  const editComment = (comment) => {
    let comments = [];
    videos[currentVideo - 1].comments.map((com) => {
      if (com.id === comment.id) {
        comments.push(comment);
      } else {
        comments.push(com);
      }
    });

    // delete
    let changedVideo = {
      id: videos[currentVideo - 1].id,
      title: videos[currentVideo - 1].title,
      description: videos[currentVideo - 1].description,
      user: videos[currentVideo - 1].user,
      user_image: videos[currentVideo - 1].user_image,
      category: videos[currentVideo - 1].category,
      publication_date: videos[currentVideo - 1].publication_date,
      icon: videos[currentVideo - 1].icon,
      video: videos[currentVideo - 1].video,
      views: videos[currentVideo - 1].view,
      like: videos[currentVideo - 1].like,
      dislike: videos[currentVideo - 1].dislike,
      comments: comments,
    };
    // editCurrent(changedVideo);
  };

  // not mine
  const deleteComment = (id) => {
    let comments = videos[currentVideo - 1].comments.filter((com) => com.id != id);

    let changedVideo = {
      id: videos[currentVideo - 1].id,
      title: videos[currentVideo - 1].title,
      description: videos[currentVideo - 1].description,
      user: videos[currentVideo - 1].user,
      user_image: videos[currentVideo - 1].user_image,
      category: videos[currentVideo - 1].category,
      publication_date: videos[currentVideo - 1].publication_date,
      icon: videos[currentVideo - 1].icon,
      video: videos[currentVideo - 1].video,
      views: videos[currentVideo - 1].view,
      like: videos[currentVideo - 1].like,
      dislike: videos[currentVideo - 1].dislike,
      comments: comments,
    };
    // editCurrent(changedVideo);
  };

  // not mine
  if (gotologin) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={styles.Feed}>
      <div className={styles.Up}>
        <UpBar context={context} setSearchText={setsearchText} setTrigger={settrigger} />
      </div>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setcurrentVideo={setcurrentVideo} />
          </div>
        ) : (
          <VideoDisplay
            currentVideo={videos[currentVideo - 1]}
            videos={videos}
            setcurrentVideo={setcurrentVideo}
            currentUser={currentUser}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        )}
      </div>
      {trigger && currentUser != null ? (
        <AddVideoPopup
          currenUser={currentUser} // eventually gets user id
          onClose={() => settrigger(false)}
        />
      ) : (
        trigger && currentUser == null && <Navigate to="/login" />
      )}
    </div>
  );
}
