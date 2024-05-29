import { BrowserRouter, Routes, Route, Outlet, useNavigate,Navigate } from "react-router-dom";
import logo from './logo.svg';
import Feed from "./pages/Feed/Feed";
import './App.css';
import { useState } from "react";

function App() {
  const [move, setmove] = useState(false)

  return (
    <BrowserRouter>
      <Routes
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
        <Route path="/about" element={move?<Navigate to=".."/>:<div><h2>Home</h2>
          <button onClick={() => setmove(true)}>move</button>
        </div>} />
  <Route path="/" element={<Feed/>} />
</Routes>
    </BrowserRouter>
  );
}

export default App;