import React from "react";
import Message from "../message/Message";
import "./Conversation.css";

class Conversation extends React.Component {
  state = {
    message: ""
  };
  render() {
    const makeMessage = (msgObj, index) => {
      if (typeof msgObj.message === "string") {
        return (
          <Message
            key={index}
            position={msgObj.position || false}
            label={msgObj.label || false}
            date={msgObj.date || false}
            message={msgObj.message}
            hasTail={msgObj.hasTail || false}
          />
        );
      } else if (typeof msgObj.message === "object") {
        console.log(msgObj.message);
        return (
          <Message
            key={index}
            position={msgObj.position || false}
            message={msgObj.message}
            hasTail={msgObj.hasTail || false}
            hasOptions={true}
            conversationHandler={this.props.onSubmit}
          />
          // <div>OPtions</div>
        );
      } else if (React.isValidElement(msgObj.message)) {
        return msgObj.message;
      } else {
        return false;
      }
    };
    return (
      <div className="conversation">
        <div className="conversation__header">
          <h6>Virtual Assistant</h6>
        </div>
        <div className="conversation__messages">
          <div>{this.props.messageObjectList.map(makeMessage)}</div>
        </div>
        <div className="conversation__input-container">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.message === "") {
                return;
              }
              this.props.onSubmit(this.state.message);
              this.setState({ message: "" });
            }}
            className="conversation__form"
          >
            <input
              placeholder="Say something to Jane."
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              className="conversation__input"
            />
            <button className="conversation__button">
              {this.state.message === "" ? (
                <i className="icon-user" />
              ) : (
                <i className="icon-arrow-right" />
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Conversation;
