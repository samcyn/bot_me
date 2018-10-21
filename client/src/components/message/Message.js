import React from "react";
import "./Message.css";

const ListOptions = ({ option, conversationHandler }) => (
  <li
    key={option.label}
    onClick={() => conversationHandler(option.value.input.text)}
  >
    {option.label}
  </li>
);
const OptionsHandler = ({ message, conversationHandler }) => (
  <div className="message__content">
    <p>{message.title}</p>
    <ul>
      {message.options.map(option => {
        return (
          <ListOptions
            key={option.label}
            option={option}
            conversationHandler={conversationHandler}
          />
        );
      })}
    </ul>
  </div>
);
function Message(props) {
  return (
    <div
      className={
        props.position === "right"
          ? "message message--from-right"
          : "message message--from-left"
      }
    >
      {props.label && <div className="message__label">{props.label}</div>}
      {props.hasOptions ? (
        <OptionsHandler
          message={props.message}
          conversationHandler={props.conversationHandler}
        />
      ) : (
        <div className="message__content">{props.message}</div>
      )}
      {props.hasTail && (
        <div className="message__tail">
          <div className="message__tail-background" />
          <div className="message__tail-foreground" />
        </div>
      )}
      {props.date ? <div className="message__date">{props.date}</div> : false}
    </div>
  );
}

export default Message;
