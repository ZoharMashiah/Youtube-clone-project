import React, { useState, useEffect } from "react";
import styles from "./AddVideoPopup.module.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function AddVideoPopup({ currenUser, onClose }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [video, setvideo] = useState(null);
  const [category, setcategory] = useState("");
  const categories = [
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAdmin = currenUser.username === "admin" && currenUser.password === "admin";

    if (!isAdmin && !isFormValid()) {
      alert("Fill all the fields!");
      return;
    }

    try {
      const newVideo = await createNewVideo();
      const address = `/api/users/${currenUser.id}/videos`;
      console.log("Sending request to:", address);
      const res = await fetch(address, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        console.log("Full response:", res);
        throw new Error(`HTTP error. status: ${res.status}`);
      }

      alert("Upload is successful!");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
    }

    resetForm();
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" && description.trim() !== "" && category.trim() !== "" && image !== null && video !== null
    );
  };

  useEffect(() => {
    if (currenUser.username === "admin" && currenUser.password === "admin") {
      settitle("Admin Default Title");
      setdescription("Admin Default Description");
      setcategory("Admin Default Category");
    }
  }, [currenUser]);

  const createNewVideo = async () => {
    return {
      user_id: currenUser.id,
      title: title,
      description: description,
      category: category,
      video: video,
      icon: image,
    };
  };

  const resetForm = () => {
    settitle("");
    setdescription("");
    setimage(null);
    setvideo(null);
    setcategory("");
    onClose();
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // read data as url is old, swap with URL.createObjectURL(file)
    });
  };

  return (
    <div className={styles.AddVideoWrapper}>
      <div className={`card ${styles.AddVideoCard}`}>
        <h2 className={styles.h2}>Add New Video</h2>
        <form onSubmit={handleSubmit} className={styles.cardWrapper}>
          <input
            placeholder="Title"
            className={styles.title}
            name="title"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            name="description"
          />
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {category === "" ? "Category" : category}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.selectCategory}>
              {categories.map((categ) => (
                <Dropdown.Item key={categ} onClick={() => setcategory(categ)}>
                  {categ}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <input
            className={styles.videoUpload}
            type="file"
            alt="Upload Video"
            name="video"
            accept=".mp4"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const dataUrl = await readFileAsDataURL(file);
                  setvideo(dataUrl);
                } catch (error) {
                  console.error("Error reading file:", error);
                }
              }
            }}
          />
          <input
            className={styles.photoUpload}
            type="file"
            alt="Upload Photo"
            accept=".png, .jpeg, .jpg"
            name="thumbnail"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const dataUrl = await readFileAsDataURL(file);
                  setimage(dataUrl);
                } catch (error) {
                  console.error("Error reading file:", error);
                }
              }
            }}
          />
          <div className="btn-group">
            <button class="btn btn-primary" className={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" className={styles.addBtn}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
