import React from 'react';

export default function QuestionCard({ question, onUpvote }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>{question.text}</div>
      <button onClick={() => onUpvote(question.id)}>▲ {question.votes}</button>
    </div>
  );
}
