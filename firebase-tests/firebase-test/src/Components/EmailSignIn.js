import React, { Component } from "react";
import firebase from "../Firebase.js";

class EmailSignIn extends Component {
  state = {
    isLoggedIn: false,
    email: "",
    password: "",
    photoURL: null,
    uid: '',
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
        const { photoURL, uid } = firebase.auth().currentUser;

        this.setState({ isLoggedIn: true, photoURL, uid, });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ email: "", password: "" });
  };

  handleSignOut = () => {
    console.log(firebase.auth(), 'auth obj')

    firebase.auth().signOut().then((user) => {
      // Sign-out successful.
      console.log(user)
      const { email, photoURL, uid } = firebase.auth().currentUser;
      this.setState({ isLoggedIn: false, email, photoURL, uid });

    }).catch(function (error) {
      // An error happened.
      console.log(error)
    });
  };

  render() {
    return (
      <div className="login">
        <h2>Log In</h2>
        <form>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          {this.state.uid ? (
            <button onClick={this.handleSignOut}>Sign Out</button>
          ) : (
              <button onClick={this.handleSignIn}>Sign In</button>
            )}
        </form>
      </div>
    );
  }
}

export default EmailSignIn;
