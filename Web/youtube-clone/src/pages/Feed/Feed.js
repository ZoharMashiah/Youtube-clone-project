import React, { useState } from "react";
import styles from "./Feed.module.css";
import UpBar from "../../components/Feed/UpBar/UpBar";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { Navigate } from "react-router-dom";

export default function Feed({ currentUser, setcurrentUser, videos, setVideos }) {
  const [selectedCategory, setselectedCategory] = useState("All");
  const [filterdedVideos, setfilterdedVideos] = useState(videos);
  const [searchText, setsearchText] = useState("");
  const [currentVideo, setcurrentVideo] = useState(0);
  const [trigger, settrigger] = useState(false);
  const [gotologin, setgotologin] = useState(false);

  const filterVideos = () => {
    let arr = videos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()));
    setcurrentVideo(0);
    setfilterdedVideos(arr);
  };

  const filterVideosCategory = (category) => {
    if (category === "All") setfilterdedVideos(videos);
    else {
      let arr = videos.filter((video) => video.category === category);
      setfilterdedVideos(arr);
    }
  };

  const editVideo = (video) => {
    let id = video.id;
    let arr = [];
    videos.map((vid) => {
      if (vid.id === id) {
        console.log(video);
        arr.push(video);
      } else {
        arr.push(vid);
      }
    });
    setVideos(arr);
    setfilterdedVideos(arr);
  };

  const editCurrent = (video) => {
    let arr = [];
    videos.map((vid) => {
      if (vid.id === video.id) {
        arr.push(video);
      } else {
        arr.push(vid);
      }
    });
    setVideos(arr);
    setfilterdedVideos(arr);
    setcurrentVideo(video.id);
  };

  const likedPush = (username, like) => {
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
      comments: videos[currentVideo - 1].comments,
    };

    if (like == true) {
      if (changedVideo.dislike.includes(username)) {
        changedVideo.dislike = changedVideo.dislike.filter((user) => user != username);
        changedVideo.like.push(username);
      } else if (!changedVideo.like.includes(username)) changedVideo.like.push(username);
      else changedVideo.like = changedVideo.like.filter((user) => user != username);
    } else {
      if (changedVideo.like.includes(username)) {
        changedVideo.like = changedVideo.like.filter((user) => user != username);
        changedVideo.dislike.push(username);
      } else if (!changedVideo.dislike.includes(username)) changedVideo.dislike.push(username);
      else changedVideo.dislike = changedVideo.dislike.filter((user) => user != username);
    }
    editCurrent(changedVideo);
  };

  const editComment = (comment) => {
    let comments = [];
    videos[currentVideo - 1].comments.map((com) => {
      if (com.id === comment.id) {
        comments.push(comment);
      } else {
        comments.push(com);
      }
    });
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
    editCurrent(changedVideo);
  };

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
    editCurrent(changedVideo);
  };

  const deleteVideo = (id) => {
    let arr = videos.filter((vid) => vid.id != id);
    setVideos(arr);
    setfilterdedVideos(arr);
    setcurrentVideo(0);
  };

  if (gotologin) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={styles.Feed}>
      <div className={styles.Up}>
        <UpBar
          setsearchText={setsearchText}
          filterVideos={filterVideos}
          setcurrentVideo={setcurrentVideo}
          setfilterdedVideos={setfilterdedVideos}
          videos={videos}
          settrigger={settrigger}
          currentUser={currentUser}
          setcurrentUser={setcurrentUser}
          setgotologin={setgotologin}
        />
      </div>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed
              selectedCategory={selectedCategory}
              setselectedCategory={setselectedCategory}
              filterdedVideos={filterdedVideos}
              setcurrentVideo={setcurrentVideo}
              filterVideosCategory={filterVideosCategory}
            />
          </div>
        ) : (
          <VideoDisplay
            currentVideo={videos[currentVideo - 1]}
            editVideo={editVideo}
            videos={videos}
            setcurrentVideo={setcurrentVideo}
            currentUser={currentUser}
            likedPush={likedPush}
            editComment={editComment}
            deleteComment={deleteComment}
            deleteVideo={deleteVideo}
          />
        )}
      </div>
      {trigger && currentUser != null ? (
        <AddVideoPopup
          setvideos={setVideos}
          videos={videos}
          currenUser={currentUser}
          setfilterdVideos={setfilterdedVideos}
          filterdedVideos={filterdedVideos}
          onClose={() => settrigger(false)}
        />
      ) : (
        trigger && currentUser == null && <Navigate to="/login" />
      )}
    </div>
  );
}
