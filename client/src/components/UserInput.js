/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import WatsonSpeech from "watson-speech";
import ApiServices from "../services/Api";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      stream: null,
      isRecording: false,
      text: "",
      error: null
    };
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
    this.generateSpeehToTextToken = this.generateSpeehToTextToken.bind(this);
    this.speechHandler = this.speechHandler.bind(this);
  }

  
  async speechHandler() {
    let stream;
    const token = await ApiServices.get("/speech-to-text/token");
    if (token) {
      // I N I T I A L I Z E - A U D I O - R E C O R D I N G
      stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token.data,
        extractResults: true,
        inactivity_timeout: 5,
        format: false,
        keepMicrophone: true
      });
      this.setState({ stream });
    }
    const {
      addMessage,
      conversationHandler,
      isLoading,
      textToken
    } = this.props;
    const { isRecording } = this.state;
    const outputDate = new Date().toLocaleTimeString();

  
    stream.on("data", function(data) {
      // console.log(data.final);
      if (data.final && !isLoading && !isRecording) {
        this.setState({
          text: data.alternatives[0].transcript
        });
        const text = data.alternatives[0].transcript;
        
        const outputMessage = {
          position: "right",
          message: text,
          date: outputDate,
          hasTail: true
        };
        // A D D - U S E R - V O I C E - T E X T - T O - T H E - P A N E L
        addMessage(outputMessage);

        // S E N D - R E Q U E S T;
        conversationHandler(text, addMessage, textToken);
        this.setState({ isRecording: true });
        console.log(data.alternatives[0].transcript);
        
      }
      else {
        console.log("stopping....");
        this.setState({ isRecording: false });
        stream.stop.bind(stream);
      }
    }.bind(this));
  }

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

  async generateSpeehToTextToken() {
    try {
      const token = await ApiServices.get("/speech-to-text/token");
      if (token) {
        // I N I T I A L I Z E - A U D I O - R E C O R D I N G
        const stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
          token: token.data,
          extractResults: true,
          inactivity_timeout: 5,
          format: false,
          keepMicrophone: true
        });
        this.setState({ stream });
      }
    } catch (err) {
      console.log({ err });
    }
  }

  inputOnChangeHandler = ({ target: { value } }) => {
    this.setState({
      text: value
    });
  };

  render() {
    const { isRecording } = this.state;
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
            onClick={this.speechHandler}
          >
            <i className={isRecording ? "icon-microphone has-text-danger" :"icon-microphone has-text-primary" }/>
          </button>
        </form>
      </div>
    );
  }
}

export default UserInput;
