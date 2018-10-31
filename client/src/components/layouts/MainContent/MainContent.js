/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import WatsonSpeech from "watson-speech";
import Header from "../Header/Header";
import UserInput from "../../UserInput";
import MessagePanel from "../../Messages/MessagePanel";

import ApiServices from "../../../services/Api";
import ResponseHandler from "../../../utils/responseHandler";
import TextToSpeechHandler from "../../../utils/textToSpeechHandler";
import ErrorHandler from "../../../utils/errorHandler";

import "./MainContent.css";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      messageObjectList: [],
      isLoading: false,
      textToken: null,
      speechToken: null,
      audioSource: null,
      text: ""
    };
    this.conversationHandler = this.conversationHandler.bind(this);
    this.generateTokens = this.generateTokens.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);
    this.stopTranscription = this.stopTranscription.bind(this);
    this.reset = this.reset.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleTranscriptEnd = this.handleTranscriptEnd.bind(this);
    this.submitUserInputHandler = this.submitUserInputHandler.bind(this);
  }

  // I N I T I A L I Z E - M E S S A G E
  async componentDidMount() {
    await this.generateTokens();
    const textToken = this.state.textToken;
    if (textToken) {
      this.conversationHandler("hi", this.addMessage, textToken);
    }
  }

  // A D D - M E S S A G E - T O - T H E - P A N E L
  addMessage = msgObj => {
    this.setState({
      messageObjectList: [...this.state.messageObjectList, msgObj]
    });
  };

  // T H I S - I S - T H E - H E A R T - O F - T H E - A P P L I C A T I O N
  async conversationHandler(text, addMessage, textToken) {
    // S T A R T - L O A D E R
    this.setState({ isLoading: true });
    try {
      const apiResponse = await ApiServices.post("/message", {
        input: { text: text.trim() } // T R I M - T E X T - H E R E
      });
      // S T O P - L O A D E R
      this.setState({ isLoading: false });

      // R E S P O N S E - H A N D L E R - W A T S O N - C O N V E R S A T I O N;
      ResponseHandler(apiResponse, addMessage);

      // T U R N - T H E - M I C - B E F O R E - C A L L I N G - T E X T - T O - S P E E C H - S E R V I C E
      this.handleMicClick();

      // T E X T - T O - S P E E C H - H A N D L E R - W A T S O N;
      TextToSpeechHandler(apiResponse, textToken, null, this.handleMicClick);

      //  E M P T Y - I N P U T - F I E L D - THIS IS USEFUL IF YOU DONT WANT USER TO;
      // this.setState({ text: "" });
    } catch (err) {
      // E R R O R - H A N D L E R;
      ErrorHandler(err, null);
    }
  }

  // G E N E R A T E - S P E E C H - T O - T E X T - A N D - T E X T - T O - S P E E C H - T O K E N S
  async generateTokens() {
    try {
      const textTokenLocal = localStorage.getItem("textToken");
      const speechTokenLocal = localStorage.getItem("speechToken");
      if (textTokenLocal && speechTokenLocal) {
        this.setState({
          textToken: textTokenLocal,
          speechToken: speechTokenLocal
        });
      } else {
        const token = await ApiServices.get("/text-to-speech/token");
        const tokenSTT = await ApiServices.get("/speech-to-text/token");

        if (tokenSTT) {
          this.setState({
            textToken: token.data,
            speechToken: tokenSTT.data
          });
          localStorage.setItem("textToken", token.data);
          localStorage.setItem("speechToken", tokenSTT.data);
        }
      }
    } catch (err) {
      console.log("TOKENS ", { err });
      ErrorHandler(err, null);
    }
  }

  // TO G G L E - M I C - U S E A G E
  handleMicClick() {
    if (this.state.audioSource === "mic") {
      this.stopTranscription();
      return;
    }
    this.reset();
    this.setState({ audioSource: "mic" });

    if (this.state.speechToken) {
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

  // H A N D L E - S T R E A M
  handleStream(stream) {
    // console.log(stream);
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;

    stream
      .on("data", this.handleFormattedMessage)
      .on("end", this.handleTranscriptEnd)
      .on("error", (err, extra) => ErrorHandler(err, extra));

    stream.recognizeStream.on("end", () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });
  }

  // F O R M A T - W A T S O N - S P E E C H - T O - T E X T - R E S U L T
  handleFormattedMessage(msg) {
    const { isLoading, textToken } = this.state;
    const outputDate = new Date().toLocaleTimeString();
    // C H E C K - W H E N - U S E R - I S - D O N E - T A L K I N G..- P R O B A B L Y - D O N E - T A L K I N G
    if (msg.final) {
      // U S E R 'S - V O I C E - I N - T E X T
      const text = msg.alternatives[0].transcript.replace(
        new RegExp("%HESITATION", "gi"),
        "!" // R E P L A C E - A L L - % H E S I T A T I O N - W I T H - E X C L A M A T I O N - M A R K
      );
      this.setState({ text });
      //I F - U S E R - I S - D O N E - T A L K I N G - A N D - W A T S O N - C O N V E R S A T I O N - S E R V E R - I S N 'T - B U S Y - A N D - T E X T - T O - S P E E C H - I S N 'T - T A L K I N G
      // C O N F I D E N C E - L E V E L - C H E C K - A L S O
      if (msg.alternatives[0].confidence > 0.25 && text !== "" && !isLoading) {
        const outputMessage = {
          position: "right",
          message: text,
          date: outputDate,
          hasTail: true
        };
        this.addMessage(outputMessage);
        this.conversationHandler(text, this.addMessage, this.state.textToken);
      } else {
        const message = "I did'nt get.. say it again!";
        const outputMessage = {
          position: "left",
          message,
          date: outputDate,
          hasTail: true
        };
        this.addMessage(outputMessage);
        // T U R N - T H E - M I C - B E F O R E - C A L L I N G - T E X T - T O - S P E E C H - S E R V I C E
        this.handleMicClick();
        // R E A D - P R O M P T - M E S S A G E - T O - U S E R - S I N C E - T H I S - I S - N O T - A P I - C A L L - T O - W A T S I O N - F I R S T - A R G U M E N T - I S - N U L L
        TextToSpeechHandler(null, textToken, message, this.handleMicClick);
      }
    }
  }

  handleTranscriptEnd() {
    this.setState({ audioSource: null });
  }

  // I N P U T - H A N D L E R - U S E D - T O - S E T - S T A T E
  inputOnChangeHandler = ({ target: { value } }) => {
    this.setState({
      text: value
    });
  };

  // O N - S U B M I T - O F - F O R M
  submitUserInputHandler() {
    const { isLoading, textToken, text } = this.state;
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
      this.addMessage(outputMessage);

      // S E N D - R E Q U E S T;
      this.conversationHandler(text, this.addMessage, textToken);
      // E M P T Y - I N P U T - F I E L D;
      this.setState({ text: "" });
    }
  }

  render() {
    const { sideBarToggleHandler } = this.props;
    const {
      messageObjectList,
      isLoading,
      textToken,
      audioSource,
      text
    } = this.state;

    return (
      <section className="bot__main">
        {/* M A I N C O N T E N T - H E A D E R */}
        <Header sideBarToggleHandler={sideBarToggleHandler} />
        <section className="bot__body">
          {/* M E S S A G E - P A N E L */}
          <MessagePanel
            messages={messageObjectList}
            conversationHandler={this.conversationHandler}
            addMessage={this.addMessage}
            isLoading={isLoading}
            textToken={textToken}
          />
          {/* U S E R - T Y P E - I N P U T - H E R E */}
          <UserInput
            addMessage={this.addMessage}
            conversationHandler={this.conversationHandler}
            isLoading={isLoading}
            textToken={textToken}
            audioSource={audioSource}
            handleMicClick={this.handleMicClick}
            text={text}
            inputOnChangeHandler={this.inputOnChangeHandler}
            submitUserInputHandler={this.submitUserInputHandler}
          />
        </section>
      </section>
    );
  }
}

export default MainContent;
