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

const lectureRooms = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_lecture', ({ code, slideNumber }) => {
    socket.join(`${code}-${slideNumber}`);
    console.log(`Socket ${socket.id} joined lecture ${code} slide ${slideNumber}`);

    const questions = lectureRooms[code]?.[slideNumber] || [];
    socket.emit('init_questions', questions);
  });

  socket.on('ask_question', ({ code, slideNumber, text }) => {
    const question = {
      id: Date.now().toString(),
      text,
      votes: 0
    };

    if (!lectureRooms[code]) lectureRooms[code] = {};
    if (!lectureRooms[code][slideNumber]) lectureRooms[code][slideNumber] = [];

    lectureRooms[code][slideNumber].unshift(question);
    io.to(`${code}-${slideNumber}`).emit('new_question', question);
  });

  socket.on('upvote', ({ code, slideNumber, id }) => {
    const questions = lectureRooms[code]?.[slideNumber] || [];
    const q = questions.find(q => q.id === id);
    if (q) {
      q.votes += 1;
      io.to(`${code}-${slideNumber}`).emit('question_upvoted', { id, votes: q.votes });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
