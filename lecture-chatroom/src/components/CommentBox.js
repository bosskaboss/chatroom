import React, { useState, useEffect } from 'react';

export default function CommentBox({ currentSlide, socket }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on(`slide-${currentSlide}-comments`, (data) => {
      setComments(data);
    });

    // Request latest comments for new slide
    socket.emit("getComments", currentSlide);

    return () => {
      socket.off(`slide-${currentSlide}-comments`);
    };
  }, [currentSlide]);

  const sendComment = () => {
    if (input.trim()) {
      socket.emit("newComment", { slide: currentSlide, text: input });
      setInput("");
    }
  };

  return (
    <div>
      <h3>Comments on Slide {currentSlide + 1}</h3>
      <ul>
        {comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendComment}>Send</button>
    </div>
  );
}
