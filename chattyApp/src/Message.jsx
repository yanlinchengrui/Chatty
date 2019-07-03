import React, { Component } from 'react';

class Message extends Component {
  render() {
    const color = { color: this.props.color };

    let wordContent = this.props.content.split(' ');

    const images = this.props.content.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);

    const rezContent = images ? wordContent.map((each, i) => {
      for (const image of images) {
        if (image === each) {
          return <img className="chat-image" src={image} key={this.props.id + i} />;
        } else {
          return each + ' ';
        }
      }
    }) : this.props.content;

    const notification = (
      <div className="message system" style={color}> {this.props.content} </div>
    );
    const msg = (
      <div className="message">
        <span className="message-username" style={color}>{this.props.username}</span>
        <span className="message-content">{rezContent}</span>
      </div>
    );
    const msgOrNote = this.props.type === 'incomingMessage' ? msg : notification;
    return (
      <div> {msgOrNote} </div>
    );
  }
}

export default Message;
