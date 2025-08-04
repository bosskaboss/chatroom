import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinLecture.css';

export default function JoinLecture() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const joinLecture = () => {
    if (code.trim()) {
      navigate(`/chat/${code.trim()}/1`);
    }
  };

  return (
    <div className="join-lecture-container">
      <h2>Enter Lecture Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="ABC123"
        className="join-lecture-input"
      />
      <button onClick={joinLecture} className="join-lecture-button">
        Join
      </button>
    </div>
  );
}
