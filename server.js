const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const pokemon = require('pokemon');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    let name = pokemon.random();

    socket.emit('join response', {name: name})
    io.emit('join', {name: name});
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});