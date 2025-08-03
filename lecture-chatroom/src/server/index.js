const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all for development
    methods: ['GET', 'POST']
  }
});

// Store questions per lecture code
const lectureRooms = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_lecture', (code) => {
    socket.join(code);
    console.log(`Socket ${socket.id} joined lecture ${code}`);

    // Send existing questions to the new user
    const questions = lectureRooms[code] || [];
    socket.emit('init_questions', questions);
  });

  socket.on('ask_question', ({ code, text }) => {
    const question = {
      id: Date.now().toString(),
      text,
      votes: 0
    };

    if (!lectureRooms[code]) {
      lectureRooms[code] = [];
    }

    lectureRooms[code].unshift(question);

    io.to(code).emit('new_question', question); // Broadcast to everyone
  });

  socket.on('upvote', ({ code, id }) => {
    const questions = lectureRooms[code] || [];
    const q = questions.find(q => q.id === id);
    if (q) {
      q.votes += 1;
      io.to(code).emit('question_upvoted', { id, votes: q.votes });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
