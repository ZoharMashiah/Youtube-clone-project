import React, { useState, useEffect } from "react";
import styles from "./RightFeed.module.css";
import Categories from "../Categories/Categories";
import VideoShow from "../VideoShow/VideoShow";
import axios from "axios";

export default function RightFeed({
  selectedCategory,
  setselectedCategory,
  filterdedVideos,
  setcurrentVideo,
  filterVideosCategory,
}) {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);
  const handleClick = (video) => {
    setcurrentVideo(video);
  };

  const fetchFeed = async () => {
    const res = await axios.get("/api/videos");
    const videoList = res.data;
    setVideoList(videoList);
  };

  // // fetch a list of videos by id
  // const filterVideos = () => {
  //   let arr = videos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()));
  //   setcurrentVideo(0);
  //   setfilterdedVideos(arr);
  // };

  // // fetch a list of videos by category
  // const filterVideosCategory = (category) => {
  //   if (category === "All") setfilterdedVideos(videos);
  //   else {
  //     let arr = videos.filter((video) => video.category === category);
  //     setfilterdedVideos(arr);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Categories
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          filterVideosCategory={filterVideosCategory}
        />
      </div>
      <div>
        {/* maybe delete video container and wrapper because video show has those*/}
        <div id={styles.videoContainer}>
          <div id={styles.wrapper}>
            <div className={styles.grid}>
              {videoList.map((video) => (
                <div key={video._id} onClick={() => handleClick(video)}>
                  <VideoShow {...video} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
