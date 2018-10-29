/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import Header from "../Header/Header";

import botServices from "../../../utils/botServices";
import chat from "../../../assets/chat.png";
import "./SideBar.css";

const servicesAvailable = botServices || [];

const ListItem = ({id, title, content, active, openUpCardContent }) => (
  <li className={active ? "bot__items bot__active" : "bot__items"} onClick={ () => openUpCardContent(id) }>
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">{title}</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="icon-close" aria-hidden="true" />
          </span>
        </a>
      </div>
      <div className="card-content">{content}</div>
    </div>
  </li>
);

class SideBar extends Component {
  state = {
    currentIdSelected: 1
  }

  openUpCardContent = (id) => {
    this.setState({
      currentIdSelected: id
    });
  }

  render() {
    const { currentIdSelected } = this.state;
    const { startRecordingAudio } = this.props;
    return (
      <aside className="bot__aside">
        <Header isSideBar={true} startRecordingAudio={startRecordingAudio}/>
        <section className="bot__aside-body">
          <div className="bot__aside-help-wrap">
            <img src={chat} alt="" />
            <h3 className="bot__aside-help">Help</h3>
          </div>
          <hr className="bot__hr" />
          <p className="bot__description">
            A short description of what the NSE Exchange chatbot is and what it
            can do in no more than 3 lines giving full context and being brief
            about it
          </p>

          <ul className="bots__list" id="bots__list">
            {servicesAvailable.map(({_id, title, content }) => (
              <ListItem id={_id} active={ currentIdSelected === _id } title={title} content={content} key={_id} openUpCardContent={ this.openUpCardContent }/>
            ))}
          </ul>
        </section>
      </aside>
    );
  }
}

export default SideBar;
