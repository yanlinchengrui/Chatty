import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: '',
      color: ''
    };
    this.ws = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.ws.onopen = (event) => {
      console.log('Connected to server');
    };
    this.ws.onmessage = (event) => {
      // console.log(event.data);
      const jsonData = JSON.parse(event.data);
      if (jsonData.onlineUsers) {
        this.setState({ onlineUsers: jsonData.onlineUsers });
      }
      else if (jsonData.color && !jsonData.type) { // only need to setup color once when there is only one key for color
        this.setState({ color: jsonData.color });
      }
      else {
        this.setState({ messages: this.state.messages.concat(jsonData) });
      }
    }
  }

  addMessage(message) {
    message.color = this.state.color;
    this.ws.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          {this.state.onlineUsers && <strong className="navbar-onlineUsers" > {this.state.onlineUsers} users online </strong>}
        </nav>

        <MessageList messages={this.state.messages} />

        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} color={this.state.color} />
      </div>
    );
  }
}
export default App;
