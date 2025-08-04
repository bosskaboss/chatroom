import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function UploadSlide() {
  const [file, setFile] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('slide', file);

    await axios.post('http://localhost:4000/upload', formData);
    alert('Slide uploaded!');
  };

  return (
    <div>
      <input type="file" accept=".ppt,.pptx,.pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Slide Deck</button>
    </div>
  );
};

