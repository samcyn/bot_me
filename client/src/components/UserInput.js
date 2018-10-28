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
import TextToSpeechHandler from "../utils/textToSpeechHandler";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speechToken: null,
      text: "",
      error: null,
      audioSource: null
    };
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
    this.generateSpeehToTextToken = this.generateSpeehToTextToken.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);
    this.stopTranscription = this.stopTranscription.bind(this);
    this.reset = this.reset.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleTranscriptEnd = this.handleTranscriptEnd.bind(this);
    this.handleError = this.handleError.bind(this);
    this.responseHandler = this.responseHandler.bind(this);
  }

  componentDidMount() {
    this.generateSpeehToTextToken();
  }
  // TO G G L E - M I C - U S E A G E
  handleMicClick() {
    if (this.state.audioSource === "mic") {
      this.stopTranscription();
      return;
    }
    this.reset();
    this.setState({ audioSource: "mic" });
    // I N I T I A L I Z E - A U D I O - R E C O R D I N G
    const stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: this.state.speechToken,
      extractResults: true,
      inactivity_timeout: 5,
      format: false,
      keepMicrophone: true
    });
    this.handleStream(stream);
  }
  // E N D - S T R E A M
  stopTranscription() {
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.setState({ audioSource: null });
  }
  // R E S E T - A U D I O S O U R C E
  reset() {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
  }
  // F O R M A T - W A T S O N - S P E E C H - T O - T E X T - R E S U L T
  handleFormattedMessage(msg) {
    const {
      addMessage,
      isLoading,
      textToken,
      allowSpeechToText,
      textToSpeechTalkingHandler
    } = this.props;
    const outputDate = new Date().toLocaleTimeString();
    //I F - U S E R - I S - D O N E - T A L K I N G - A N D - W A T S O N - C O N V E R S A T I O N - S E R V E R - I S N 'T - B U S Y - A N D - T E X T - T O - S P E E C H - I S N 'T - T A L K I N G
    if (msg && msg.final && !isLoading && allowSpeechToText) {
      // U S E R 'S - V O I C E - I N - T E X T
      const text = msg.alternatives[0].transcript.replace(
        new RegExp("%HESITATION", "gi"),
        "!" // R E P L A C E - A L L - % H E S I T A T I O N - W I T H - E X C L A M A T I O N - M A R K
      );
      // C O N F I D E N C E - L E V E L - C H E C K
      if (msg.alternatives[0].confidence > 0.75) {
        this.responseHandler(text);
      } else {
        const message = "I did'nt get.. say it again!";
        const outputMessage = {
          position: "left",
          message,
          date: outputDate,
          hasTail: true
        };
        addMessage(outputMessage);
        // R E A D - P R O M P T - M E S S A G E - T O - U S E R - S I N C E - T H I S - I S - N O T - A P I - C A L L - T O - W A T S I O N - F I R S T - A R G U M E N T - I S - N U L L
        TextToSpeechHandler(
          null,
          textToken,
          message,
          textToSpeechTalkingHandler
        );
      }
    }
  }

  handleStream(stream) {
    console.log(stream);
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;

    stream
      .on("data", this.handleFormattedMessage)
      .on("end", this.handleTranscriptEnd)
      .on("error", this.handleError);

    stream.recognizeStream.on("end", () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });
  }

  handleTranscriptEnd() {
    this.setState({ audioSource: null });
  }

  handleError(err, extra) {
    console.error(err, extra);
    if (err.name === "UNRECOGNIZED_FORMAT") {
      err =
        "Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.";
    } else if (
      err.name === "NotSupportedError" &&
      this.state.audioSource === "mic"
    ) {
      err = "This browser does not support microphone input.";
    } else if (err.message === "('UpsamplingNotAllowed', 8000, 16000)") {
      err =
        "Please select a narrowband voice model to transcribe 8KHz audio files.";
    } else if (err.message === "Invalid constraint") {
      // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
      err = "Unable to access microphone";
    }
    this.setState({ error: err.message || err });
  }

  submitUserInputHandler(e) {
    e.preventDefault();
    const { text } = this.state;
    // R E S P O N S E  - H A N D L E R
    this.responseHandler(text);
  }

  async generateSpeehToTextToken() {
    try {
      const token = await ApiServices.get("/speech-to-text/token");
      if (token) {
        this.setState({ speechToken: token.data });
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

  responseHandler(text) {
    const {
      addMessage,
      conversationHandler,
      isLoading,
      textToken,
      textToSpeechTalkingHandler
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
      conversationHandler(
        text,
        addMessage,
        textToken,
        textToSpeechTalkingHandler
      );
    }
  }

  render() {
    const { audioSource } = this.state;
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
            onClick={this.handleMicClick}
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
