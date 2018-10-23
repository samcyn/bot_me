import React from "react";

const OptionsHTMLBuild = ({ newMessage }) => {
  const sendOptionValue = message => {
    console.log(message.value.input);
  };

  return (
    <div>
      <p>{newMessage.message.title}</p>
      <ul>
        {newMessage.message.options.map(message => (
          <li key={message.label} onClick={() => sendOptionValue(message)}>
            {message.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Message = ({ newMessage }) => {
  const { position, message } = newMessage;
  return (
    <div className="message is-clearfix fadeInUp">
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
            {typeof newMessage.message === "string" && (
              <p>{newMessage.message}</p>
            )}
            {/* I F - M E S S A G E - T Y P E - I S - O B J E C T */}
            {typeof newMessage.message === "object" && (
              <OptionsHTMLBuild newMessage={newMessage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
