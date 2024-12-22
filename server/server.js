const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow connections from any origin
  },
});

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => res.send('Poker App Backend is Running'));

// WebSocket setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // Emit game update to all connected clients
  socket.emit('game-update', { message: 'New game state!' });

  // Listen for player actions
  socket.on('player-action', (data) => {
    console.log('Received player action:', data);
    // You can process the player action and emit a game update
    io.emit('game-update', { message: 'Game updated after player action' });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
