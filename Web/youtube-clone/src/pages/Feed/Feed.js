import React, { useState } from "react";
import styles from "./Feed.module.css";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { Navigate } from "react-router-dom";

export default function Feed({ context, setContext }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [searchText, setsearchText] = useState("");
  const [trigger, settrigger] = useState(false);

  return (
    <div className={styles.Feed}>
      {/* <div className={styles.Up}>
        <UpBar context={context} setSearchText={setsearchText} setTrigger={settrigger} />
      </div> */}
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setCurrentVideo={setCurrentVideo} />
          </div>
        ) : (
          <VideoDisplay currentUser={context} />
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
