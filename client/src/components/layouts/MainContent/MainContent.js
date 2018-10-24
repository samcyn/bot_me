/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import Header from "../Header/Header";
import UserInput from "../../UserInput";
import MessagePanel from "../../Messages/MessagePanel";

import ApiServices from "../../../services/Api";
import ResponseHandler from "../../../utils/responseHandler";
import ErrorHandler from "../../../utils/errorHandler";

import "./MainContent.css";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      messageObjectList: [],
      isLoading: false,
      textToken: null
    };
    this.conversationHandler = this.conversationHandler.bind(this);
    this.generateTextToSpeechToken = this.generateTextToSpeechToken.bind(this);
  }

  // I N I T I A L - M E S S A G E
  async componentDidMount() {
    await this.generateTextToSpeechToken();
    const textToken = this.state.textToken;
    this.conversationHandler("hi", this.addMessage, textToken);
  }

  componentDidUpdate () {
  
    const { stream } = this.props;
    // S T O P - R E C O R D I N G
    if (stream) {
      stream.promise()
        .then(function (data) {
          if (data.length !== 0) {
            const dialogue = data.pop();
            if ((dialogue.alternatives[0].transcript !== '') && (dialogue.final === true)) {
              const confidence = dialogue.alternatives[0].confidence;
              const text = dialogue.alternatives[0].transcript;
              console.log(text);
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      stream.stop();
    }
    
  }

  addMessage = msgObj => {
    this.setState({
      messageObjectList: [...this.state.messageObjectList, msgObj]
    });
  };

  async conversationHandler(text, addMessage, textToken) {
    // S T A R T - L O A D E R
    this.setState({ isLoading: true });
    try {
      const apiResponse = await ApiServices.post("/message", {
        input: { text: text.trim() } // T R I M - T E X T - H E R E
      });
      // S T O P - L O A D E R
      this.setState({ isLoading: false });

      // R E S P O N S E - H A N D L E R;
      ResponseHandler(apiResponse, addMessage, textToken);
    } catch (err) {
      // E R R O R - H A N D L E R;
      ErrorHandler(err);
    }
  }

  async generateTextToSpeechToken() {
    const token = await ApiServices.get("/text-to-speech/token");
    if (token) {
      this.setState({
        textToken: token.data
      });
    }
  }

  render() {
    const { sideBarToggleHandler } = this.props;
    const { messageObjectList, isLoading, textToken } = this.state;

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
          />
        </section>
      </section>
    );
  }
}

export default MainContent;
