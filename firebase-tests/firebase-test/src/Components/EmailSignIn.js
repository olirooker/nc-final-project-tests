import React, { Component } from "react";
import firebase from "firebase";

class EmailSignIn extends Component {
  state = {
    isLoggedIn: false,
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.setState({ isLoggedIn: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ email: "", password: "" });
  };
  render() {
    return (
      <div className="login">
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
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
          {this.state.isLoggedIn ? (
            <button>Sign Out</button>
          ) : (
            <button>Sign In</button>
          )}
        </form>
      </div>
    );
  }
}

export default EmailSignIn;
