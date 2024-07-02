import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function UserInfo() {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({})

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
  
  useEffect(() => {
    const fetchVideos = async () => {
        // temp should change with the user id of the user page clicked
        const userId = "60d5ecb54b24d1a810c4ca1c"
        const res = await fetch(`http://localhost:3000/api/users/${userId}`)
        const data = await res.json()
        setUserData(data)
    }
    fetchVideos()
},[])


  return (
      <div style={{textAlign:"center"}}>
          <img src='utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png' style={{width: "100px", height:"100px", borderRadius:"50px"}}/>
          <h4>Usraname</h4>
          <div>
          <>
      <button style={{borderWidth: "0px", color: "blue", backgroundColor: "white"}} onClick={handleShow}>
        Details
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p style={{"word-wrap": "break-word"}}>
          Username: {userData.username}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          First Name: {userData.firstName}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          Last Name: {userData.lastName}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          Birthdate: {(new Date(userData.birthdate)).getDay()}/{(new Date(userData.birthdate)).getMonth()}/{(new Date(userData.birthdate)).getFullYear()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    </>
          </div>
    </div>
  )
}
