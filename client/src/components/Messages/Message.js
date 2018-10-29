/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from "react";
import Loader from "../Loader/Loader";

const OptionsHTMLBuild = ({ newMessage, addMessage, conversationHandler, token }) => {
  const sendOptionValue = message => {
    const text = message.value.input.text;
    const outputDate = new Date().toLocaleTimeString();
    const outputMessage = {
      position: "right",
      message: text,
      date: outputDate,
      hasTail: true
    };
    // A D D - U S E R - I N P U T - T O - T H E - P A N E L
    addMessage(outputMessage);

    // S E N D - R E Q U E S T;
    conversationHandler(text, addMessage, token);
  };

  return (
    <div>
      <p>{newMessage.title}</p>
      <ul>
        {newMessage.options.map(message => (
          <li key={message.label} onClick={() => sendOptionValue(message)}>
            {message.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Message = ({ newMessage, conversationHandler, addMessage, token, isLoading }) => {
  const { position, message } = newMessage;
  return (
    // D E C I D E - W H I C H - C L A S S - I F - S E R V E R - I S - B U S Y
    <div className={ isLoading ? "message is-clearfix fadeInUp is-loading" : "message is-clearfix fadeInUp"}>
      {/* D E C I D E - C L A S S - B A S E D - O N - M E S S A G E - P O S I T I O N */}
      <div
        className={
          position === "left"
            ? "message__from-watson message__latest message__top"
            : "message__from-user message__latest message__top"
        }
      >
        {/* S H O W - A V A T A R  */}
        {position === "left" && (
          <div className="circles">
            <span className="circles__letter">J</span>
          </div>
        )}

        <div className="message__inner is-clearfix">
          {/* D E C I D E - C L A S S - B A S E D - O N - M E S S A G E - P O S I T I O N */}
          <div
            className={
              position === "left"
                ? "is-pulled-left message__text message__text--watson"
                : "is-pulled-right message__text message__text--user"
            }
          >
            {/* I F - M E S S A G E - T Y P E - I S - S T R I N G */}
            {typeof message === "string" && <p>{message}</p>}
            {/* I F - M E S S A G E - T Y P E - I S - O B J E C T */}
            {typeof message === "object" && (
              <OptionsHTMLBuild
                newMessage={message}
                addMessage={addMessage}
                conversationHandler={conversationHandler}
                token={token}
              />
            )}
          </div>
        </div>
        {/* L O A D E R - S H O W N - W H E N - I T E M - I S - L A S T - I N - T H E - P A N E L - A N D - I T'S - N O T - W A T S O N - R E S P O N S E - B U T - U S E R S */}
        {position !== "left" && isLoading && <div className="message__loader is-pulled-right"><Loader /></div>}
      </div>
    </div>
  );
};

export default Message;
