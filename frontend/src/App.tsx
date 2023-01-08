import React from "react";
import "./App.css";
import Watch from "./page/Watch";
import Home from "./page/Home";
import WebCamFC from "./page/WebCamFC";
import CreateVideo from "./page/CreateVideo";
import ProfileUser from "./page/ProfileUser";
import ListVideoOfUser from "./page/ListVideoOfUser";
import Login from "./page/Login";
import Register from "./page/Register";
import History from "./page/History";
import ChannelUser from "./page/ChannelUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watch/:video" element={<Watch />}></Route>
          <Route path="/webcam" element={<WebCamFC />}></Route>
          <Route path="/createVideo" element={<CreateVideo />}></Route>
          <Route path="/user" element={<ProfileUser />}></Route>
          <Route path="/listVideo/:user" element={<ListVideoOfUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/channel/:id" element={<ChannelUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
