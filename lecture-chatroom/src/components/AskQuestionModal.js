import React, { useState, useEffect } from 'react';

export default function AskQuestionModal({ isOpen, onClose, onSubmit }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!isOpen) setText('');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          width: '90%',
          maxWidth: 400,
        }}
      >
        <h3>Ask a Question</h3>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button
          onClick={() => {
            if (text.trim()) onSubmit(text.trim());
          }}
          style={{ marginRight: 10 }}
        >
          Submit
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
