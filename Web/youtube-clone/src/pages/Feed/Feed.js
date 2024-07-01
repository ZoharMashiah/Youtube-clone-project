import React, { useState, useContext } from "react";
import AppContext from "../../AppContext";
import styles from "./Feed.module.css";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import RightFeed from "../../components/Feed/RightFeed/RightFeed";
import LeftMenu from "../../components/Feed/LeftMenu/LeftMenu";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { trigger, setTrigger } = useOutletContext();
  const { currentUser } = useContext(AppContext);

  console.log("current user: ", currentUser);

  // not gonna stay here ofc
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filterVideosCategory, setfilterVideosCategory] = useState([]);

  // !!!after uploading a video, need to refresh the rightfeed!!!!
  return (
    <div className={styles.Home}>
      <div className={styles.LeftMenu}>
        <LeftMenu />
      </div>
      <div className={styles.Right}>
        <RightFeed
          selectedCategory={selectedCategory}
          setselectedCategory={setSelectedCategory}
          filterdedVideos={filteredVideos}
          filterVideosCategory={filterVideosCategory}
        />
      </div>

      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
