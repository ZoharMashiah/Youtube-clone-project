import React, { useState, useContext } from "react";
import Category from "../Category/Category";
import styles from "./Categories.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../../AppContext";

export default function Categories({}) {
  const { selectedCategory, setSelectedCategory, filterVideos, stopFilter } = useContext(AppContext);

  const [categories] = useState([
    "All",
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

  const onClickHandle = async (category) => {
    setSelectedCategory(category);
    if (category !== "All") {
      await filterVideos(false, category);
    } else {
      stopFilter();
    }
  };
  return (
    <div id={styles.categoriesWrraper} class="overflow-auto">
      {categories.map((category) => {
        if (category === selectedCategory)
          return <Category text={category} selected={true} onClick={() => onClickHandle(category)} />;
        else return <Category text={category} selected={false} onClick={() => onClickHandle(category)} />;
      })}
    </div>
  );
}
