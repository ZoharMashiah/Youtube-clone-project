import React, { useState } from "react";
import styles from "./AddVideoPopup.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import TEMP from "../../data/temp.json";

export default function AddVideoPopup({ currenUser, setvideos, videos, setfilterdVideos, filterdedVideos, onClose }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [video, setvideo] = useState(null);
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState([
    "Music",
    "Mixes",
    "JavaScript",
    "Gaming",
    "Bouldering",
    "Display devices",
    "AI",
    "Computer Hardware",
    "Table News",
    "Inventions",
    "News",
    "Comedy clubs",
    "Skills",
    "3D printing",
  ]);

  const currUser = TEMP[0];

  const handleAdd = async () => {
    if (!isFormValid) {
      alert("Fill all the fields!");
      return;
    }

    const newVideo = createNewVideo();
    updateState(newVideo);
    resetForm();

    try {
      const res = await fetch(`api/users/${currUser.id}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
    }
  };

  const getMaxId = () => {
    let id = 0;
    videos.map((video) => {
      if (video.id > id) {
        id = video.id;
      }
    });
    return id;
  };

  const isFormValid = () => {
    return title.length > 0 && description.length > 0 && image != null && video != null && category.length > 0;
  };

  const createNewVideo = () => ({
    id: getMaxId() + 1,
    title,
    description,
    user: currenUser.username,
    user_image: currenUser.photo,
    category,
    publication_date: Date.now(),
    icon: image,
    video,
    views: 0,
    like: [],
    dislike: [],
    comments: [],
  });

  const updateState = (newVideo) => {
    setvideos((prevVideos) => [...prevVideos, newVideo]);
    setfilterdVideos((prevFilteredVideos) => [...prevFilteredVideos, newVideo]);
  };

  const resetForm = () => {
    settitle("");
    setdescription("");
    setimage(null);
    setvideo(null);
    setcategory("");
    onClose();
  };

  return (
    <div className={styles.AddVideoWrapper}>
      <div class="card" className={styles.AddVideoCard}>
        <h2 className={styles.h2}>Add New Video</h2>
        <div className={styles.cardWrapper}>
          <input
            placeholder="Title"
            className={styles.title}
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <input placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {category === "" ? "Category" : category}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.selectCategory}>
              {categories.map((categ) => {
                return <Dropdown.Item onClick={() => setcategory(categ)}>{categ}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
          <input
            className={styles.videoUpload}
            type="file"
            alt="Upload Video"
            accept=".mp4"
            onChange={(e) => {
              let file = e.target.files[0];
              setvideo(URL.createObjectURL(file));
            }}
          />
          <input
            className={styles.photoUpload}
            type="file"
            alt="Upload Photo"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              let file = e.target.files[0];
              setimage(URL.createObjectURL(file));
            }}
          />
          <div class="btn-group">
            <button class="btn btn-primary" className={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
            <button class="btn btn-primary" className={styles.addBtn} onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
