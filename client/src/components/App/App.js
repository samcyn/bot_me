/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import SideBar from "../layouts/SideBar/SideBar";
import MainContent from "../layouts/MainContent/MainContent";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSideBar: false,
      isAudio: false
    };
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
  };

  

  render() {
    const { openSideBar } = this.state;
    return (
      <main className={openSideBar ? "bot openNav" : "bot"}>
        {/* S I D E B A R  */}
        <SideBar startRecordingAudio={this.startRecordingAudio} />
        {/* <M A I N C O N T E N T  */}
        <MainContent sideBarToggleHandler={this.sideBarToggleHandler} />
      </main>
    );
  }
}

export default App;
