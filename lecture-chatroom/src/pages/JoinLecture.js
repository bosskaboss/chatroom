import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinLecture() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const joinLecture = () => {
    if (code.trim()) {
      navigate(`/chat/${code.trim()}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter Lecture Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="ABC123"
        style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
      />
      <br />
      <button onClick={joinLecture} style={{ padding: '10px 20px', fontSize: 16 }}>
        Join
      </button>
    </div>
  );
}
