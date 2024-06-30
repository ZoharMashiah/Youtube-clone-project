import React, { useEffect, useState } from "react";
import styles from "./SuggestedVideos.module.css";
import { useNavigate } from "react-router-dom";
import ShowVideoSuggested from "../ShowVideoSuggested/ShowVideoSuggested";
import axios from "axios";

export default function SuggestedVideos(currentVideo) {
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleClick = (video) => {
    navigate(`/users/${video.userId}/videos/${video._id}`);
  };

  const fetchFeed = async () => {
    try {
      const res = await axios.get("/api/videos");
      const videoList = res.data;
      setVideoList(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
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
