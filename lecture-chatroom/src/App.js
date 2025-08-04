import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import JoinLecture from './pages/JoinLecture';
import Chatroom from './pages/Chatroom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinLecture />} />
        <Route path="/chat/:code/:slidenumber" element={<Chatroom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;