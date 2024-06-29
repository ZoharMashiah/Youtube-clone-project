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
  const videoData = {
    _id: "667ec5f3c7afe6630839a008",
    user_id: "60d5ecb54b24d1a810c4ca1c",
    title: "ExampleTitle",
    description: "This is a description of the video.",
    category: "category",
    publication_date: "2024-06-28T14:17:23.203Z",
    views: 0,
    like: 0,
    dislike: 0,
    comments: [],
    icon: "https://example.com/path/to/thumbnail.jpg",
    video: "https://example.com/path/to/video.mp4",
  };
  const videoData2 = {
    _id: "667ec5f3c7afe6630839a009",
    user_id: "60d5ecb54b24d1a810c4ca1c",
    title: "video2",
    description: "This is a description of the video.",
    category: "category",
    publication_date: "2024-06-28T14:17:23.203Z",
    views: 0,
    like: 0,
    dislike: 0,
    comments: [],
    icon: "https://example.com/path/to/thumbnail.jpg",
    video: "https://example.com/path/to/video.mp4",
  };
  const [videoList, setVideoList] = useState([videoData, videoData2]);

  useEffect(() => {
    fetchFeed();
  }, []);
  const handleClick = (video) => {
    setcurrentVideo(video);
  };

  const fetchFeed = async () => {
    console.log("hi");
    const res = await axios.get("/api/videos");
    const videoList = res.data;
    setVideoList(videoList);
    console.log(videoList);
  };

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
