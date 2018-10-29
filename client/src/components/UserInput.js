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
    this.state = {};
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
  }

  // O N - S U B M I T - O F - F O R M
  submitUserInputHandler(e) {
    e.preventDefault();
    this.props.submitUserInputHandler();
  }

  render() {
    const {
      handleMicClick,
      audioSource,
      text,
      inputOnChangeHandler
    } = this.props;
    return (
      <div className="bot__message-input">
        <form onSubmit={this.submitUserInputHandler}>
          <input
            className="input input--brand"
            id="textInput"
            type="text"
            placeholder="Text input"
            autoComplete="off"
            value={text}
            onChange={inputOnChangeHandler}
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
