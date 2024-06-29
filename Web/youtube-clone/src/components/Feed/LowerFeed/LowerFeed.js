import React from "react";
import styles from "./LowerFeed.module.css";
import RightFeed from "../RightFeed/RightFeed";
import LeftMenu from "../LeftMenu/LeftMenu";

export default function LowerFeed({
  selectedCategory,
  setselectedCategory,
  filterdedVideos,
  setcurrentVideo,
  filterVideosCategory,
}) {
  return (
    <div className={styles.Feed}>
      <div className={styles.Left}>
        <LeftMenu />
      </div>
      <div className={styles.Right}>
        <RightFeed
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          filterdedVideos={filterdedVideos}
          setcurrentVideo={setcurrentVideo}
          filterVideosCategory={filterVideosCategory}
        />
      </div>
    </div>
  );
}
