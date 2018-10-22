/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from "react";
import Header from "../Header/Header";
import "./MainContent.css";

const MainContent = ({ sideBarToggleHandler }) => (
  <section className="bot__main">
    {/* M A I N C O N T E N T - H E A D E R */}
    <Header sideBarToggleHandler={ sideBarToggleHandler } />
    <section className="bot__body">
      <div className="bot__message-pane" id="scrollingChat" />
      <div className="bot__message-input">
        <form>
          <input
            className="input input--brand"
            id="textInput"
            type="text"
            placeholder="Text input"
            autoComplete="off"
          />
        </form>
      </div>
    </section>
  </section>
);


export default MainContent;