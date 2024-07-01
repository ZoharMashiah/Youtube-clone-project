import React, { useState, useEffect, useContext } from "react";
import styles from "./RightFeed.module.css";
import Categories from "../Categories/Categories";
import VideoShow from "../VideoShow/VideoShow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../../AppContext";

export default function RightFeed({ selectedCategory, setselectedCategory, filterdedVideos, filterVideosCategory }) {
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    console.log("current user: ", currentUser);
    fetchFeed();
  }, []);

  const handleClick = (video) => {
    console.log("clicked a video");
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

  // // filter a list of videos by id
  // const filterVideos = () => {
  //   let arr = videos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()));
  //   setcurrentVideo(0);
  //   setfilterdedVideos(arr);
  // };
  // // filter a list of videos by category
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
        <div className={styles.grid}>
          {videoList.map((video) => (
            <div key={video._id} onClick={() => handleClick(video)}>
              <VideoShow {...video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
