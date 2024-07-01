import React, { useState } from "react";
import styles from "./Feed.module.css";
import LowerFeed from "../../components/Feed/LowerFeed--/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import RightFeed from "../../components/Feed/RightFeed/RightFeed";
import LeftMenu from "../../components/Feed/LeftMenu/LeftMenu";
import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../AppContext";

export default function Feed() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { trigger, setTrigger } = useOutletContext();

  // not gonna stay here ofc
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filterVideosCategory, setfilterVideosCategory] = useState([]);

  // const filterVideosByCategory = (category) => {
  //   const filtered = allVideos.filter((video) => video.category === category);
  //   setFilteredVideos(filtered);
  //   setSelectedCategory(category);
  // };

  // !!!after uploading a video, need to refresh the rightfeed!!!!
  return (
    <div className={styles.Home}>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <div className={styles.Feed}>
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
            </div>
          </div>
        ) : (
          <VideoDisplay />
        )}
      </div>
      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
