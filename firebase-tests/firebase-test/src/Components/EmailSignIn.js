import React, { Component } from "react";
import firebase from "../FirebaseConfig.js";

class EmailSignIn extends Component {
  state = {
    // input: {
    email: "",
    password: "",
    // },
    user: {
      name: "",
      uid: "",
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSignIn = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        const { displayName, uid } = firebase.auth().currentUser;
        this.setState({ user: { name: displayName, uid } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ email: "", password: "" });
    console.log(this.state.user);
  };

  handleSignOut = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then((user) => {
        // Sign-out successful.
        this.setState({ user: { name: "", uid: "" } });
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  render() {
    const { email, password } = this.state;
    const { name, uid } = this.state.user;

    return (
      <div className="login">
        <h2>Log In</h2>
        <form>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          {uid ? (
            <div>
              <button onClick={this.handleSignOut}>Sign Out</button>
              <p>Hello, {name}</p>
            </div>
          ) : (
            <button onClick={this.handleSignIn}>Sign In</button>
          )}
        </form>
      </div>
    );
  }
}

export default EmailSignIn;
