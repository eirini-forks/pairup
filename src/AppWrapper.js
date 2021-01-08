import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import App from "./App";
import {
  bs,
  fontSize,
  lineHeight,
  marginBottom,
  Controls,
  Control,
  Checklist,
  ChecklistItem,
  Check
} from "./common-styles";

import styled from "styled-components";

const Heading = styled.h1`
  color: white;
  font-size: ${fontSize};
  line-height: ${lineHeight};
  margin-bottom: ${marginBottom};
`;

export default class AppWrapper extends React.Component {

  state = {
    isSignedIn: false
  };

  uiConfig = {
    signInFlow: 'popup',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],

    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
          <div style={{ textAlign: 'center' }}>
          <Heading>Pair Up!</Heading>
          <img src="logo.png" />
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
        <App boardName={this.props.boardName} enableFirebase={this.props.enableFirebase} />
    );
  }
}
