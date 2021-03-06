const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const uuidv1 = require('uuid/v1');
const randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // sending color to client
  ws.send(JSON.stringify({ color: randomColor({ alpha: 1 }) }));

  wss.broadcast = function (data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  wss.broadcast(JSON.stringify({ onlineUsers: wss.clients.size }));

  ws.on('message', function incoming(data) {
    const jsonData = JSON.parse(data);
    jsonData.id = uuidv1();
    jsonData.type = jsonData.type === 'postNotification' ? 'incomingNotification' : 'incomingMessage';

    // console.log(jsonData);

    wss.broadcast(JSON.stringify(jsonData));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(JSON.stringify({ onlineUsers: wss.clients.size }));
  });
});
