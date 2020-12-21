import React, { Component } from "react";
import SetHomeLocation from "./components/SetHomeLocation";

class App extends Component {
  state = {
    homeAddress: null,
  };

  addHome = (address) => {
    this.setState({ homeAddress: address });
  };

  render() {
    return (
      <div>
        <h1>GPS Tracking</h1>
        <p>Home Address: {this.state.homeAddress}</p>
        <SetHomeLocation addHome={this.addHome} />
      </div>
    );
  }
}

export default App;
