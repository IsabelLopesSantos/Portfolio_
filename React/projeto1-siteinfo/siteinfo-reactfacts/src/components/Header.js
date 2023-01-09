import React from "react";
import logo from "./logo.png";


export default function Header() {
    return(
      <header>
        <nav>
          <img src={logo} alt="logo react" width="40px"/>
          <h2>ReactFacts</h2>
        </nav>
        <p>React Course - Project 1</p>
      </header>
    );
}