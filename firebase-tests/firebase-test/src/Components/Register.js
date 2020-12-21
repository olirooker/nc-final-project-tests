import React, { Component } from "react";
import firebase from "../FirebaseConfig.js";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { name, email, password } = this.state;
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        const userInfo = firebase.auth().currentUser;
        userInfo.updateProfile({
          displayName: name,
        });
        // is the error handling correct here?
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    return (
      <div className="container">
        <div className="register">
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
