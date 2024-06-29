import React from "react";
import styles from "./LogoMenu.module.css";
import Image from "react-bootstrap/Image";
import { useNavigate, useLocation } from "react-router-dom";

export default function LogoMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/", { replace: true });
      setTimeout(() => window.location.reload(), 10);
    }
  };

  return (
    <div className={styles.imgContainer}>
      <button onClick={handleClick} className={styles.imageButton}>
        <Image src="utilites/Image.png" rounded width="100px" height="65px" className={styles.Image} />
      </button>
    </div>
  );
}
