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
  case "#garden":
    render("garden")
    break;
  case "#scratch":
    render("scratch")
    break;
  case "#eirini":
  default:
    console.log(window.location.hash)
    render("eirini")
    break;
}
