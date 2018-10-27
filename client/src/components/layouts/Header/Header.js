/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openDropDown: false
    }
  }

  toggleDropDownState = () => {
    this.setState(prevState => {
      return {
        openDropDown: !prevState.openDropDown
      }
    });
  }

  render() {
    const { isSideBar, startRecordingAudio, sideBarToggleHandler } = this.props;
    const { openDropDown } = this.state;
    return (
      <header className="bot__header">
        {/* S I D E B A R - H E A D E R - OR - M A I N C O N T E N T - H E A D E R  */}
        {isSideBar ? (
          <nav
            className="navbar is-flex justify-content-space-between"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item" href="#">
                <h2 className="bot__aside-title">My Homie</h2>
              </div>
            </div>
            <div className="navbar-menu is-active">
              <div className="navbar-end">
                <div className="navbar-item">
                  <button className="button is-transparent is-paddingless is-shadowless is-borderless has-text-primary"
                  onClick={ this.toggleDropDownState }>
                    <i className="icon-options-vertical" />
                  </button>
                  <div className={ openDropDown ? "dropdown" : "dropdown is-hidden"}>
                    <a
                      className="navbar-item has-text-primary"
                      onClick={startRecordingAudio}
                    >
                      Record
                    </a>
                    <a className="navbar-item has-text-primary">Read</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item" href="#">
                <div className="circles">
                  <span className="circles__letter">J</span>
                </div>
                <div className="user">
                  <h6 className="user__name">Jane</h6>
                  <small className="user__status fadeInUp">Online</small>
                </div>
              </div>

              <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                onClick={sideBarToggleHandler}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
