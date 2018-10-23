import React, { Component } from "react";
import Message from "./Message";

class MessagePanel extends Component {
  scrollToBottom() {
    const element = document.getElementsByClassName("bot__message-pane")[0];
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="bot__message-pane" id="scrollingChat">
        {/* I N C O M I N G - M E S S A G E S - H E R E */}
        {messages.map((message, index) => (
          <Message key={index} newMessage={message} />
        ))}
      </div>
    );
  }
}

export default MessagePanel;
