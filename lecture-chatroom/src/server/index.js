const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // In production, change this to your frontend domain
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ------------------ Multer Upload ------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('slide'), (req, res) => {
  const file = req.file;
  const lectureCode = req.body;
  console.log(req.body);
  if (!file) return res.status(400).send('No file uploaded');

  const ext = path.extname(file.originalname);
  if (ext !== '.pdf') {
    return res.status(400).send('Only PDF files are supported for now');
  }

  res.send({ message: 'File uploaded successfully' });
});

const lectures = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_lecture', (code) => {
    socket.join(code);
    if (!lectures[code]) lectures[code] = [];
    socket.emit('init_questions', lectures[code]);
  });

  socket.on('ask_question', ({ code, text }) => {
    const newQuestion = {
      id: Date.now().toString(),
      text,
      votes: 0,
    };
    lectures[code].unshift(newQuestion);
    io.to(code).emit('new_question', newQuestion);
  });

  socket.on('upvote', ({ code, id }) => {
    const questions = lectures[code];
    const q = questions.find(q => q.id === id);
    if (q) {
      q.votes += 1;
      io.to(code).emit('question_upvoted', { id, votes: q.votes });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
