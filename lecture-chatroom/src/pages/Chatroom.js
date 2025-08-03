import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AskQuestionModal from '../components/AskQuestionModal';
import QuestionCard from '../components/QuestionCard';

export default function Chatroom() {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const addQuestion = (text) => {
    const newQuestion = { id: Date.now().toString(), text, votes: 0 };
    setQuestions([newQuestion, ...questions]);
  };

  const upvote = (id) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, votes: q.votes + 1 } : q))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lecture Chatroom: {code}</h2>
      {questions.length === 0 && <p>No questions yet.</p>}
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} onUpvote={upvote} />
      ))}
      <button onClick={() => setModalOpen(true)} style={{ marginTop: 20, padding: '10px 20px' }}>
        Ask a Question
      </button>
      <AskQuestionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(text) => {
          addQuestion(text);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
