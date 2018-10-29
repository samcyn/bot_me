/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
  }

  // O N - S U B M I T - O F - F O R M
  submitUserInputHandler(e) {
    e.preventDefault();
    const { text } = this.state;
    const {
      addMessage,
      conversationHandler,
      isLoading,
      textToken
    } = this.props;
    // I F - T E X T - I S - N O T - E M P T Y - A N D - S E R V E R - I S - N O T - B U S Y
    if (text !== "" && !isLoading) {
      const outputDate = new Date().toLocaleTimeString();
      const outputMessage = {
        position: "right",
        message: text,
        date: outputDate,
        hasTail: true
      };
      // A D D - U S E R - I N P U T - T O - T H E - P A N E L
      addMessage(outputMessage);

      // E M P T Y - I N P U T - F I E L D;
      this.setState({ text: "" });

      // S E N D - R E Q U E S T;
      conversationHandler(text, addMessage, textToken);
    }
  }

  // I N P U T - H A N D L E R - U S E D - T O - S E T - S T A T E
  inputOnChangeHandler = ({ target: { value } }) => {
    this.setState({
      text: value
    });
  };

  render() {
    const { handleMicClick, audioSource } = this.props;
    return (
      <div className="bot__message-input">
        <form onSubmit={this.submitUserInputHandler}>
          <input
            className="input input--brand"
            id="textInput"
            type="text"
            placeholder="Text input"
            autoComplete="off"
            value={this.state.text}
            onChange={this.inputOnChangeHandler}
          />
          <button
            className="button is-transparent is-borderless is-shadowless"
            onClick={handleMicClick}
          >
            <i
              className={
                audioSource
                  ? "icon-microphone has-text-danger"
                  : "icon-microphone has-text-primary"
              }
            />
          </button>
        </form>
      </div>
    );
  }
}

export default UserInput;
