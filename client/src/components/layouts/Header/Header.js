/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from "react";
import "./Header.css";

const Header = ({isSideBar, sideBarToggleHandler}) => (
  <header className="bot__header">
    {/* S I D E B A R - H E A D E R - OR - M A I N C O N T E N T - H E A D E R  */}
    { 
      isSideBar ?
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item" href="#">
            <h2 className="bot__aside-title">N.S.E Chatbot</h2>
          </div>
        </div>
      </nav>
      :
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
            onClick={ sideBarToggleHandler }
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
      </nav>
    }
  </header>
);

export default Header;
