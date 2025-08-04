import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import JoinLecture from './pages/JoinLecture';
import Chatroom from './pages/Chatroom';
import Host from './pages/Host';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinLecture />} />
        <Route path="/chat/:code" element={<Host />} />
        <Route path="/chat/:code/:slidenumber" element={<Chatroom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;