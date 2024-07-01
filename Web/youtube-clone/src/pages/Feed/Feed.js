import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import styles from "./Feed.module.css";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import axios from "axios";
import Categories from "../../components/Feed/Categories/Categories";
import VideoShow from "../../components/Feed/VideoShow/VideoShow";
import LeftMenu from "../../components/Feed/LeftMenu/LeftMenu";

import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const { trigger, setTrigger } = useOutletContext();
  const { currentUser } = useContext(AppContext);
  console.log("current user: ", currentUser);

  // not gonna stay here ofc
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterVideosCategory, setfilterVideosCategory] = useState([]);

  //here

  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  // !!!after uploading a video, force a fetch!!!!

  useEffect(() => {
    console.log("current user: ", currentUser);
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("/api/videos");
      const videoList = res.data;
      console.log(videoList);
      setVideoList(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleClick = (video, videoList) => {
    console.log("clicked a video");
    navigate(`/users/${video.userId}/videos/${video._id}`);
  };

  return (
    <div className={styles.Home}>
      <div className={styles.LeftMenu}>
        <LeftMenu />
      </div>
      <div className={styles.FeedContainer}>
        <div className={styles.categories}>
          <Categories
            selectedCategory={selectedCategory}
            setselectedCategory={setSelectedCategory}
            filterVideosCategory={filterVideosCategory}
          />
        </div>
        <div>
          <div className={styles.videoGrid}>
            {videoList.map((video) => (
              <VideoShow key={video._id} {...video} onClick={() => handleClick(video)} />
            ))}
          </div>
        </div>
      </div>

      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
