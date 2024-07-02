import React, { useEffect, useState } from "react";
import styles from "./SuggestedVideos.module.css";
import { useNavigate } from "react-router-dom";
import ShowVideoSuggested from "../ShowVideoSuggested/ShowVideoSuggested";

export default function SuggestedVideos(currentVideo, videoList) {
  const navigate = useNavigate();
  currentVideo = { _id: "" };

  const handleClick = (video) => {
    navigate(`/users/${video.userId}/videos/${video._id}`);
  };

  return (
    <div>
      <h3 className={styles.title}>More Videos</h3>
      {videoList.map((video) => {
        if (video._id !== currentVideo._id) {
          return <ShowVideoSuggested video={video} handleClick={() => handleClick(video)} />;
        }
        return null;
      })}
    </div>
  );
}
