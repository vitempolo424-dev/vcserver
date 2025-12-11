// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (index.html, main.js, etc.)
app.use(express.static(path.join(__dirname)));

// Socket.IO signaling
io.on('connection', socket => {
  console.log('a user connected:', socket.id);

  // Relay chat messages
  socket.on('chat', msg => {
    io.emit('chat', msg);
  });

  // Relay WebRTC signaling data
  socket.on('signal', data => {
    socket.broadcast.emit('signal', data);
  });

  // Relay ICE candidates
  socket.on('ice-candidate', candidate => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// Use Render’s injected PORT or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

