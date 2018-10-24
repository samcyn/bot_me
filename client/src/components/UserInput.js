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
      isLoading: false,
      text: "",
      error: null
    };
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
  }
  

  submitUserInputHandler(e) {
    e.preventDefault();
    const { text } = this.state;
    const { addMessage, conversationHandler, isLoading, textToken } = this.props;
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

  inputOnChangeHandler = ({ target: { value } }) => {
    this.setState({
      text: value
    });
  };

  render() {
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
        </form>
      </div>
    );
  }
}

export default UserInput;
