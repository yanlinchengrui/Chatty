import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const messages = this.props.messages.map((msg) => {
      return (<Message key={msg.id} {...msg} />);
    });
    return (
      <main className="messages">
        {messages}
        <div ref={(el) => { this.messagesEnd = el; }}></div>
      </main>
    );
  }
}

export default MessageList;