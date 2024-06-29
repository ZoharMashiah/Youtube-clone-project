import React, { useState } from "react";
import VideoShow from "../VideoShow/VideoShow";
import vid from "../../../data/videos.json";
import styles from "./Videos.module.css";

export default function Videos({ videos, setcurrentVideo }) {
  const handleClick = (video) => {
    setcurrentVideo(video);
  };

  const [videoList, setVideoList] = useState("");

  useEffect(() => {
    console.log("filtered: ", filterdedVideos);
  }, []);

  const fetchFeed = async () => {
    console.log("hi");
    const res = await axios.get("/api/videos");
    const videoList = res.data;
    setVideoList(videoList);
    console.log(videoList);
  };

  let i = 0;
  return (
    <div id={styles.container}>
      <div id={styles.wrapper}>
        <div className={styles.grid}>
          {videos.map((videoList) => {
            return <div>{/* <VideoShow {...video} onClick={() => handleClick(video._id)} /> */}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
