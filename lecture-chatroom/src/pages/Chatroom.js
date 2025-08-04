import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import AskQuestionModal from '../components/AskQuestionModal';
import QuestionCard from '../components/QuestionCard';

import './Chatroom.css';

const socket = io('http://localhost:4000');

export default function Chatroom() {
  const { code, slidenumber } = useParams(); // get both
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join_lecture', { code, slideNumber: slidenumber });

    socket.on('init_questions', (initialQs) => setQuestions(initialQs));
    socket.on('new_question', (question) => setQuestions(prev => [question, ...prev]));
    socket.on('question_upvoted', ({ id, votes }) =>
      setQuestions(prev => prev.map(q => (q.id === id ? { ...q, votes } : q)))
    );

    return () => {
      socket.off('init_questions');
      socket.off('new_question');
      socket.off('question_upvoted');
    };
  }, [code, slidenumber]);

  const addQuestion = (text) => {
    socket.emit('ask_question', { code, slideNumber: slidenumber, text });
  };

  const upvote = (id) => {
    socket.emit('upvote', { code, slideNumber: slidenumber, id });
  };

  const nextslide = () => {
    navigate(`/chat/${code.trim()}/${slidenumber - 1 + 2}`);
  };
  const prevslide = () => {
    if (slidenumber > 1) {
      navigate(`/chat/${code.trim()}/${slidenumber - 1}`);
    }
  };

  return (
    <div className="chatroom" style={{ padding: 20 }}>
      <h2>Lecture Chatroom: {code}, Slide: {slidenumber}</h2>
      {questions.length === 0 && <p>No questions yet.</p>}
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} onUpvote={upvote} />
      ))}
      <div className="button-group">
        <button onClick={() => setModalOpen(true)}>Ask a Question</button>
        <div>
          <button onClick={prevslide}>Previous Slide</button>
          <button onClick={nextslide}>Next Slide</button>
        </div>
      </div>
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
