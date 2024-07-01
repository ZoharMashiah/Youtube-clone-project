// import React, { useState, useEffect, useContext } from "react";
// import styles from "./RightFeed.module.css";
// import Categories from "../Categories/Categories";
// import VideoShow from "../VideoShow/VideoShow";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../../../AppContext";

// export default function RightFeed({ selectedCategory, setselectedCategory, filterVideosCategory }) {
//   const [videoList, setVideoList] = useState([]);
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AppContext);

//   // !!!after uploading a video, force a fetch!!!!

//   useEffect(() => {
//     console.log("current user: ", currentUser);
//     fetchFeed();
//   }, []);

//   const fetchFeed = async () => {
//     try {
//       const res = await axios.get("/api/videos");
//       const videoList = res.data;
//       console.log(videoList);
//       setVideoList(videoList);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleClick = (video, videoList) => {
//     console.log("clicked a video");
//     navigate(`/users/${video.userId}/videos/${video._id}`);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.categories}>
//         <Categories
//           selectedCategory={selectedCategory}
//           setselectedCategory={setselectedCategory}
//           filterVideosCategory={filterVideosCategory}
//         />
//       </div>
//       <div>
//         <div className={styles.videoGrid}>
//           {videoList.map((video) => (
//             <VideoShow key={video._id} {...video} onClick={() => handleClick(video)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
