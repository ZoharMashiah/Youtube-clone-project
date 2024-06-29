import React, { useState, useEffect } from "react";
import styles from "./RightFeed.module.css";
import Videos from "../Videos/Videos";
import Categories from "../Categories/Categories";
import axios from "axios";

export default function RightFeed({
  selectedCategory,
  setselectedCategory,
  filterdedVideos,
  setcurrentVideo,
  filterVideosCategory,
}) {
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

  return (
    <div>
      <div className={styles.middle}>
        <Categories
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          filterVideosCategory={filterVideosCategory}
        />
      </div>
      <div className={styles.bottom}>
        <div id={styles.container}>
          <div id={styles.wrapper}>
            <div className={styles.grid}>
              {videoList.map((videoList) => {
                return <div>{/* <VideoShow {...video} onClick={() => handleClick(video._id)} /> */}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
