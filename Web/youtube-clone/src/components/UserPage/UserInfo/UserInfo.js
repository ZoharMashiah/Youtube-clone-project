import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function UserInfo({userId}) {
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
        const res = await fetch(`/api/users/${userId}`)
      const data = await res.json()
      console.log(data.photo)
        setUserData(data)
    }
    fetchVideos()
},[])


  return (
      <div style={{textAlign:"center"}}>
          <img src={userData.photo != null? userData.photo :'utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png'} style={{width: "100px", height:"100px", borderRadius:"50px"}}/>
          <h4>{userData.username}</h4>
          <div>
          <>
      <p style={{borderWidth: "0px", color: "blue", backgroundColor: "transparent"}} onClick={handleShow}>
        Details
      </p>

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
