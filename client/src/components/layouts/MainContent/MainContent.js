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
      isLoading: false
    };
    this.conversationHandler = this.conversationHandler.bind(this);
  }

  addMessage = msgObj => {
    this.setState({
      messageObjectList: [...this.state.messageObjectList, msgObj]
    });
  };

  async conversationHandler(text, addMessage) {
    // S T A R T - L O A D E R
    this.setState({ isLoading: true });
    try {
      const apiResponse = await ApiServices.post("/message", {
        input: { text: text.trim() } // T R I M - T E X T - H E R E
      });
      // S T O P - L O A D E R
      this.setState({ isLoading: false });

      // R E S P O N S E - H A N D L E R;
      ResponseHandler(apiResponse, addMessage);
    } catch (err) {
      // E R R O R - H A N D L E R;
      ErrorHandler(err);
    }
  }

  render() {
    const { sideBarToggleHandler } = this.props;
    const { messageObjectList, isLoading } = this.state;
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
            isLoading = { true }
          />
          {/* U S E R - T Y P E - I N P U T - H E R E */}
          <UserInput
            addMessage={this.addMessage}
            conversationHandler={this.conversationHandler}
            isLoading={isLoading}
          />
        </section>
      </section>
    );
  }
}

export default MainContent;
