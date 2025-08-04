import React, { useState } from 'react';

export default function AskingQuestion({ socket, code, slide }) {
  const [text, setText] = useState('');

  const ask = () => {
    socket.emit('ask_question', { code, slide, text });
    setText('');
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Ask question..." />
      <button onClick={ask}>Send</button>
    </div>
  );
}
