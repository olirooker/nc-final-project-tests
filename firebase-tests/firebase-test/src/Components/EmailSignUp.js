import React, { Component } from "react";
import firebase, { auth, provider } from "firebase";

class EmailSignUp extends Component {
  state = {
    register: { email: "", password: "" },
    login: { email: "", password: "" },
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  handleRegisterSubmit = (event) => {
    const { email, password } = this.state.register;
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ register: { email: "", password: "" } });
  };
  handleLoginSubmit = (event) => {
    const { email, password } = this.state.login;
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ login: { email: "", password: "" } });
  };
  render() {
    return (
      <div className="container">
        <div className="register">
          <h2>Register</h2>
          <form onSubmit={this.handleRegisterSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={this.state.register.email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={this.state.register.password}
                onChange={this.handleChange}
              />
            </label>
            <button>Sign Up</button>
          </form>
        </div>
        <div className="login">
          <h2>Log In</h2>
          <form onSubmit={this.handleLoginSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={this.state.login.email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={this.state.login.password}
                onChange={this.handleChange}
              />
            </label>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EmailSignUp;
