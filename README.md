# Chatty Project

Chatty is a client-side SPA (single-page app) that allows users to communicate with each other without having to register accounts.

Stack:
- ReactJS
- Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- WebSockets using Node package ws on the server-side, and native WebSocket on client side

## Screenshot

!["Screenshot of Chatty"](https://github.com/yanlinchengrui/Chatty/blob/master/docs/chatty.png)

## Getting Started

1. Install dependencies using the `npm install` command for both chattyApp and chatty_server folders
2. Start the client-side app and server using the `npm start` command. The client-side app will be served at <http://localhost:3000/> and server will be served at <http://localhost:3001/>
3. Go to <http://localhost:3000/> in your browser
4. Open another window and go to <http://localhost:3000/> to start chatting 🤪

## Dependencies

Client side: 
- ReactJS

server side: 
- node
- express
- ws
- randomcolor