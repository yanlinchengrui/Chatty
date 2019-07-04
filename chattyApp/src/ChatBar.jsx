import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      content: "",
      oldUsername: this.props.currentUser.name,
    };
    this.onContent = this.onContent.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.notOnUsername = this.notOnUsername.bind(this);
  }

  onUsername(event) {
    this.setState({ username: event.target.value });
  }

  onContent(event) {
    this.setState({ content: event.target.value });
  }

  handleEnter(event) {
    if ((event.keyCode === 13 || event.key === 'Enter') && this.state.content) {
      const message = {
        type: 'postMessage',
        ...this.state,
      };
      if (!this.state.username) {
        message.username = 'Anonymous';
      }
      this.props.addMessage(message);
      this.setState({ content: "" });
    }
  }

  notOnUsername(event) {
    if (this.state.oldUsername !== this.state.username && this.state.username) {
      const message = {
        type: 'postNotification',
        content: `${this.state.oldUsername} changed the name to ${this.state.username}`,
        color: this.props.color
      };
      this.setState({ oldUsername: this.state.username });
      this.props.addMessage(message);
    }
  }

  render() {
    return (
      <footer className="chatbar" onKeyPress={this.handleEnter}>
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.onUsername} onBlur={this.notOnUsername} maxLength="20" />
        <input autoFocus className="chatbar-message" placeholder="Type a message or image url and hit ENTER" value={this.state.content} onChange={this.onContent} maxLength="300" />
      </footer>
    );
  }
}

export default ChatBar;