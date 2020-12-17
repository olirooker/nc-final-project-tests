import React, { Component } from "react";
import firebase from "firebase";

class Register extends Component {
  state = {
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
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="container">
        <div className="register">
          <h2>Register</h2>
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
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
