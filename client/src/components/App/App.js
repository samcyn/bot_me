/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import WatsonSpeech from "watson-speech";

import Conversation from "../conversation/Conversation";

import Api from "../../services/Api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: {},
      messageObjectList: [],
      discoveryNumber: 0,
      token: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateTextToSpeechToken = this.generateTextToSpeechToken.bind(this);
    this.conversationHandler = this.conversationHandler.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    this.conversationHandler("hello");
  }

  async conversationHandler(message) {
    let apiResponse = await Api.post("/message", { input: { text: message } });
    await this.generateTextToSpeechToken();
    this.handleResponse(apiResponse);
  }

  async generateTextToSpeechToken() {
    const token = await Api.get("/text-to-speech/token");
    if (token) {
      this.setState({
        token: token.data
      });
    }
    else {
      return null
    }
  }

  async textToSpeechHandler(message, token) {
    WatsonSpeech.TextToSpeech.synthesize({
      text: message, // Output text/response
      voice: "en-US_MichaelVoice", // Default Watson voice
      autoPlay: true, // Automatically plays audio
      token: token
    });
  }

  async handleResponse(responseJson) {
    const outputIntent = responseJson.data.intents[0]
      ? responseJson.data.intents[0].intent
      : "";
    const outputDate = new Date().toLocaleTimeString(); //responseJson.date.toLocaleTimeString();
    const outputContext = responseJson.context;
    this.setState({ context: outputContext });
    responseJson.data.output.generic.forEach(data => {
      if (data && data.response_type === "text") {
        console.log(data.text);
        this.addMessage({
          position: "left",
          label: outputIntent,
          message: data.text,
          date: outputDate,
          hasTail: true
        });
        this.textToSpeechHandler(data.text, this.state.token);
      }
      if (data && data.response_type === "option") {
        // console.log(data.title, data.options);
        const message = {
          title: data.title,
          options: data.options
        };
        this.addMessage({
          position: "left",
          message,
          date: outputDate,
          hasTail: true
        });
        this.textToSpeechHandler(data.title, this.state.token);

      }
    });
  }

  addMessage(msgObj) {
    this.setState({
      messageObjectList: [...this.state.messageObjectList, msgObj]
    });
  }

  async handleSubmit(msg) {
    const inputMessage = msg;
    const inputDate = new Date();
    const formattedDate = inputDate.toLocaleTimeString();
    const msgObj = {
      position: "right",
      message: inputMessage,
      date: formattedDate,
      hasTail: true
    };
    this.addMessage(msgObj);
    // console.log(inputMessage);
    await this.conversationHandler(inputMessage);
  }

  scrollToBottom() {
    const element = document.getElementsByClassName(
      "conversation__messages"
    )[0];
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="app-wrapper">
        <Conversation
          onSubmit={this.handleSubmit}
          messageObjectList={this.state.messageObjectList}
          conversationHandler={this.conversationHandler}
        />
      </div>
    );
  }
}

export default App;
