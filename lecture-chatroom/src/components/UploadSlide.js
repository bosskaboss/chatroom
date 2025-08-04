import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UploadSlide() {
  const [code] = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('slide', file);
    formData.append('lectureCode', code);

    try {
      const res = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Uploaded!');
    } catch (err) {
      alert('Upload failed.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Slide Deck</button>
    </div>
  );
}
