import React, { useState } from "react";
import styles from "./Feed.module.css";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { trigger, setTrigger, searchText, setsearchText } = useOutletContext();

  return (
    <div className={styles.Feed}>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setCurrentVideo={setCurrentVideo} />
          </div>
        ) : (
          <VideoDisplay />
        )}
      </div>
      {trigger ? (
        <AddVideoPopup
          onClose={() => {
            setTrigger(false);
            console.log("feed set trigger");
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
