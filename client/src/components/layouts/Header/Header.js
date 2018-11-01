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
  }


  render() {
    const { isSideBar, sideBarToggleHandler } = this.props;
    return (
      <header className="bot__header">
        {/* S I D E B A R - H E A D E R - OR - M A I N C O N T E N T - H E A D E R  */}
        {isSideBar ? (
          <nav
            className="navbar is-flex justify-content-space-between is-primary"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item" href="#">
                <h2 className="bot__aside-title">NSE Chatbot</h2>
              </div>
            </div>
          </nav>
        ) : (
          <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item" href="#">
                <div className="circles has-background-white">
                  <span className="circles__letter has-text-primary">J</span>
                </div>
                <div className="user">
                  <h6 className="user__name has-text-white">Jane</h6>
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
