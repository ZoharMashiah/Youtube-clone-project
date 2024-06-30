import React, { useState } from "react";
import styles from "./Search.module.css";
import { Button, InputGroup, Form } from "react-bootstrap";

export default function Search({ filterVideos, setSearchText }) {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    const newSearchText = e.target.value;
    setText(newSearchText);
  };

  const handleButtonClick = () => {
    setSearchText(text);
  };

  return (
    <InputGroup className="mb-3" id={styles.input}>
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        id={styles.form}
        value={text}
        onChange={handleInputChange}
      />
      <Button variant="outline-secondary" id={styles.button_addon2} onClick={handleButtonClick}>
        <i className="bi bi-search" id={styles.icon} />
      </Button>
    </InputGroup>
  );
}
