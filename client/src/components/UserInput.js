import React, { Component } from "react";
import ApiServices from "../services/Api";
import ResponseHandler from "../utils/responseHandler";
import ErrorHandler from "../utils/errorHandler";

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

  async submitUserInputHandler(e) {
    e.preventDefault();
    const { text } = this.state;
    const { addMessage } = this.props;
    if (text !== "") {
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
      try {
        const apiResponse = await ApiServices.post("/message", {
          input: { text }
        });
        // R E S P O N S E - H A N D L E R;
        ResponseHandler(apiResponse, addMessage);
      } catch (err) {
        // E R R O R - H A N D L E R;
        ErrorHandler(err);
      }
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
