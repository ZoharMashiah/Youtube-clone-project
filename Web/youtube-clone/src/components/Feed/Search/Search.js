import React from 'react';
import './Search.css';
import {Button, Image, InputGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search({setsearchText, filterVideos}) {
  return (
    <div id='wrapper'>
      <InputGroup className="mb-3" id='input'>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          id='form'
          onChange={e => setsearchText(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={filterVideos}>
          <img src='utilites/search.svg'/>
        </Button>
      </InputGroup>
    </div>
    
  )
}
