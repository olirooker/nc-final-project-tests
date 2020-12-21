import React, { Component } from "react";

class SetHomeLocation extends Component {
  state = {
    latitude: null,
    longitude: null,
    homeAddress: null,
  };

  render() {
    return (
      <div>
        <h2>Set Your Home Address</h2>
      </div>
    );
  }
}

export default SetHomeLocation;
