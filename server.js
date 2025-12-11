const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname)));

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('signal', data => io.emit('signal', data));
  socket.on('chat', msg => io.emit('chat', msg));
  socket.on('file', file => io.emit('file', file));

  socket.on('disconnect', () => console.log('Client disconnected'));
  const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // free STUN
    {
      urls: "turn:your-turn-server.com:3478",
      username: "your-username",
      credential: "your-password"
    }
  ]
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
