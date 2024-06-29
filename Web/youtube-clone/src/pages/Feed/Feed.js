import React, { useState } from "react";
import styles from "./Feed.module.css";
import UpBar from "../../components/Feed/UpBar/UpBar";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { Navigate } from "react-router-dom";

export default function Home({ context, setContext }) {
  const [searchText, setsearchText] = useState("");
  const [currentVideo, setCurrentVideo] = useState(0);
  const [trigger, settrigger] = useState(false);

  return (
    <div className={styles.Home}>
      <div className={styles.Up}>
        <UpBar context={context} setSearchText={setsearchText} setTrigger={settrigger} />
      </div>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setCurrentVideo={setCurrentVideo} />
          </div>
        ) : (
          <VideoDisplay setcurrentVideo={setCurrentVideo} currentUser={context} />
        )}
      </div>
      {trigger && context != null ? (
        <AddVideoPopup context={context} onClose={() => settrigger(false)} />
      ) : (
        trigger && context == null && <Navigate to="/login" />
      )}
    </div>
  );
}
