import { BrowserRouter, Routes, Route, Outlet, useNavigate,Navigate } from "react-router-dom";
import logo from './logo.svg';
import Feed from "./pages/Feed/Feed";
import './App.css';
import { useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  const [users, setusers] = useState([])
  const [currentUser, setcurrentUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login users={users} setcurrentUser = {setcurrentUser}/>} />
        <Route path="/signup" element={<Signup users={users} setusers={setusers}/>} />
        <Route path="/feed" element={currentUser == null ?<Navigate to='/' replace={true}/>:<Feed currentUser={currentUser} setcurrentUser={setcurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;