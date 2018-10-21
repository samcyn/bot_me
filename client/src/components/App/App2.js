/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from "react";

import "./App.css";

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <main className="bot">
        {/* S I D E B A R  */}
        <aside className="bot__aside">
          <header className="bot__header">
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <div className="navbar-item" href="#">
                  <h2 className="bot__aside-title">N.S.E Chatbot</h2>
                </div>
              </div>
            </nav>
          </header>
          <section className="bot__aside-body">
            <div className="bot__aside-help-wrap">
              <img src="assets/img/Group 2.png" alt="" />
              <h3 className="bot__aside-help">Help</h3>
            </div>
            <hr className="bot__hr" />
            <p className="bot__description">
              A short description of what the NSE Exchange chatbot is and what
              it can do in no more than 3 lines giving full context and being
              brief about it
            </p>

            <ul className="bots__list" id="bots__list">
              <li className="bot__items bot__active">
                <div className="card">
                  <div className="card-header">
                    <p className="card-header-title">
                      How to check Stock Market Price
                    </p>
                    <a href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="icon-close" aria-hidden="true" />
                      </span>
                    </a>
                  </div>
                  <div className="card-content">
                    A short explanation of what the NSE Exchange chatbot is and
                    what it can do in no more than 3 lines giving full context
                    and being brief about it
                  </div>
                </div>
              </li>
              <li className="bot__items">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      How to check Top Gainers, Top Losers
                    </p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="icon-close" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    A short explanation of what the NSE Exchange chatbot is and
                    what it can do in no more than 3 lines giving full context
                    and being brief about it
                  </div>
                </div>
              </li>
              <li className="bot__items">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">How to check Market reports</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="icon-close" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    A short explanation of what the NSE Exchange chatbot is and
                    what it can do in no more than 3 lines giving full context
                    and being brief about it
                  </div>
                </div>
              </li>
              <li className="bot__items">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">How to check Trades</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="icon-close" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    A short explanation of what the NSE Exchange chatbot is and
                    what it can do in no more than 3 lines giving full context
                    and being brief about it
                  </div>
                </div>
              </li>
              <li className="bot__items">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">How to check Bonds</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="icon-close" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    A short explanation of what the NSE Exchange chatbot is and
                    what it can do in no more than 3 lines giving full context
                    and being brief about it
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </aside>
        {/* <M A I N C O N T E N T  */}
        <section className="bot__main">
          <header className="bot__header">
            <nav className="navbar" role="navigation" aria-label="main navigation">
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
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </a>
              </div>
            </nav>
          </header>
          <section className="bot__body">
            <div className="bot__message-pane" id="scrollingChat" />
            <div className="bot__message-input">
              <form>
                <input
                  className="input input--brand"
                  id="textInput"
                  type="text"
                  placeholder="Text input"
                  autocomplete="off"
                />
              </form>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

export default App;
