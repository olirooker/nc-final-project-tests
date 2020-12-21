import React, { Component } from "react";
import firebase from "../FirebaseConfig.js";

class PhoneSignIn extends Component {
  state = { phoneNumber: "", verificationCode: "" };
  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }
  handleSendCode = (event) => {
    const { phoneNumber } = this.state;
    event.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        // Error; SMS not sent
        // ...
      });
  };
  handleVerifyCode = (event) => {};
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  render() {
    return (
      <div>
        <h1>Enter your Phone Number</h1>
        <form onSubmit={this.handleSendCode}>
          <input
            type="text"
            id="phoneNumber"
            placeholder="+447"
            onChange={this.handleChange}
          />
          <div id="recaptcha-container"></div>
          <button id="sign-in-button">Send Code</button>
        </form>
        <br />
        <h1>Enter Verification Code</h1>
        <form onSubmit={this.handleVerifyCode}>
          <input
            type="text"
            id="verificationCode"
            placeholder="Enter Verification Code Here"
            onChange={this.handleChange}
          />
          <br />
          <button> Verify Code</button>
        </form>
      </div>
    );
  }
}

export default PhoneSignIn;
