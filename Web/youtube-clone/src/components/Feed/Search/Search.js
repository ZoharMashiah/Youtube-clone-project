import React from 'react';
import styles from './Search.module.css';
import {Button, Image, InputGroup, Form} from 'react-bootstrap';

export default function Search({setsearchText, filterVideos}) {
  return (
    <div id={styles.wrapper} class="input-group mb-3">
      <InputGroup className="mb-3" id={styles.input}>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          id={styles.form}
          onChange={e => setsearchText(e.target.value)}
        />
        
        <Button variant="outline-secondary" id={styles.button_addon2} onClick={filterVideos}>
          <i class='bi bi-search' id={styles.icon} />
        </Button>
      </InputGroup>
    </div>
    
  )
}
