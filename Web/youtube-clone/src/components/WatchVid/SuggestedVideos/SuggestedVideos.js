import React, { useEffect, useState } from "react";
import styles from "./SuggestedVideos.module.css";
import ShowVideoSuggested from "../ShowVideoSuggested/ShowVideoSuggested";
import axios from "axios";

export default function SuggestedVideos({ currentVideo, setCurrentVideo }) {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleClick = (video) => {
    setCurrentVideo(video);
  };

  const fetchFeed = async () => {
    console.log("hi");
    const res = await axios.get("/api/videos");
    const videoList = res.data;
    setVideoList(videoList);
    console.log(videoList);
  };

  return (
    <div>
      <h3 className={styles.title}>More Videos</h3>
      {videoList.map((video) => {
        if (video._id != currentVideo._id) {
          return <ShowVideoSuggested video={video} setcurrentVideo={setCurrentVideo} />;
        }
      })}
    </div>
  );
}
