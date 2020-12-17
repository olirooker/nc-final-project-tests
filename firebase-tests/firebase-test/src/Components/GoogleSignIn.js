import React, { Component } from "react";
import { auth, provider } from "../Firebase";

class GoogleSignIn extends Component {
  state = {
    currentItem: "",
    username: "",
    items: [],
    user: null,
  };
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  };
  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user,
      });
    });
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  render() {
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>Firebase!</h1>
            {this.state.user ? (
              <button onClick={this.logout}>Logout</button>
            ) : (
              <button onClick={this.login}>Log In With Google</button>
            )}
          </div>
        </header>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} alt="user-icon" />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <p>You must be logged in to use this app.</p>
          </div>
        )}
      </div>
    );
  }
}

export default GoogleSignIn;
