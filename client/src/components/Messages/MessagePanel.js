/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

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
    const { messages, addMessage, conversationHandler, token, isLoading, textToSpeechTalkingHandler } = this.props;
    // L A S T - I N D E X / M E S S A G E  I N - T H E - P A N E L
    const lastIndex = messages.length - 1;
    return (
      <div className="bot__message-pane" id="scrollingChat">
        {/* I N C O M I N G - M E S S A G E S - H E R E */}
        {messages.map((message, index) => (
          <Message
            key={index}
            newMessage={message}
            addMessage={addMessage}
            conversationHandler={conversationHandler}
            token={token}
            textToSpeechTalkingHandler={textToSpeechTalkingHandler}
            isLoading= { index === lastIndex ? isLoading : false } // O N L Y - T H E - L A S T - I T E M - S H O W - H A V E  -L O A D I N G
          />
        ))}
      </div>
    );
  }
}

export default MessagePanel;
