/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import WatsonSpeech from "watson-speech";
import SideBar from "../layouts/SideBar/SideBar";
import MainContent from "../layouts/MainContent/MainContent";
import ApiServices from "../../services/Api";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSideBar: false,
      isAudio: false,
      stream: null,
      speechToken: null
    };
    this.generateSpeechToTextToken = this.generateSpeechToTextToken.bind(this);
  }

  async componentDidMount() {
    await this.generateSpeechToTextToken();
  }

  // F L I P - S I D B A R - S T A T E
  sideBarToggleHandler = () => {
    this.setState(prevState => {
      return {
        openSideBar: !prevState.openSideBar
      };
    });
  };

  startRecordingAudio = () => {
    this.setState(prevState => {
      return {
        isAudio: !prevState.isAudio
      };
    });

    const { isAudio, speechToken } = this.state;
    if (isAudio && speechToken) {
      // S T A R T - R E C O R D I N G
      const stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: speechToken,
        extractResults: true,
        inactivity_timeout: 5,
        format: false,
        keepMicrophone: true
      });
      if (stream) {
        stream.on("data", function(data) {
          if (data.final === true) {
            stream.stop();
          }
        });
        this.setState({ stream });
      }
    } 
  };

  async generateSpeechToTextToken() {
    const token = await ApiServices.get("/speech-to-text/token");
    if (token) {
      this.setState({
        speechToken: token.data
      });
    }
  }

  render() {
    const { openSideBar, stream } = this.state;
    return (
      <main className={openSideBar ? "bot openNav" : "bot"}>
        {/* S I D E B A R  */}
        <SideBar startRecordingAudio={this.startRecordingAudio} />
        {/* <M A I N C O N T E N T  */}
        <MainContent sideBarToggleHandler={this.sideBarToggleHandler} stream={ stream }/>
      </main>
    );
  }
}

export default App;
