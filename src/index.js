import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./AppWrapper";

function render(board) {
  ReactDOM.render(
    <AppWrapper boardName={board} enableFirebase={true} />,
    document.getElementById("root")
  );
}

switch(window.location.hash) {
  case "#eirini":
    render("eirini")
    break;
  case "#scratch":
    render("scratch")
    break;
  case "#garden":
  default:
    console.log(window.location.hash)
    render("garden")
    break;
}
