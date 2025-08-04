import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import AskQuestionModal from '../components/AskQuestionModal';
import QuestionCard from '../components/QuestionCard';
import SlideViewer from '../components/SlideViewer'; // 👈 import your SlideViewer

const socket = io('http://localhost:4000'); // update this for production

export default function Chatroom() {
  const { code, slidenumber } = useParams();
  const slideNumberInt = parseInt(slidenumber, 10) || 1;

  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    socket.emit('join_lecture', code);

    socket.on('init_questions', (initialQs) => {
      setQuestions(initialQs);
    });

    socket.on('new_question', (question) => {
      setQuestions((prev) => [question, ...prev]);
    });

    socket.on('question_upvoted', ({ id, votes }) => {
      setQuestions(prev =>
        prev.map(q => (q.id === id ? { ...q, votes } : q))
      );
    });

    return () => {
      socket.off('init_questions');
      socket.off('new_question');
      socket.off('question_upvoted');
    };
  }, [code]);

  const addQuestion = (text) => {
    socket.emit('ask_question', { code, text });
  };

  const upvote = (id) => {
    socket.emit('upvote', { code, id });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* SlideViewer area */}
      <div style={{ flex: 2, padding: 20 }}>
        <SlideViewer lectureCode={code} slideNumber={slideNumberInt} />
      </div>

      {/* Chatroom area */}
      <div style={{ flex: 1, padding: 20, borderLeft: '1px solid #ccc', overflowY: 'scroll' }}>
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
    </div>
  );
}
