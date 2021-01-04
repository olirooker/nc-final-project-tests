import React, { Component } from "react";
import { googleMapsConfig } from "../GoogleMapsConfig";

class SetHomeLocation extends Component {
  state = {
    latitude: null,
    longitude: null,
    homeAddress: null,
  };

  getLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleErrors
      );
    } else {
      alert("Geolocation is not supported by the browser");
    }
  };

  getCoordinates = (position) => {
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.getHomeAddress();
  };

  handleErrors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("Somethings gone wrong!");
    }
  };

  getHomeAddress = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${googleMapsConfig.apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        this.setState(
          { homeAddress: data.results[0].formatted_address },
          () => {
            this.props.addHome(this.state.homeAddress);
          }
        );
        // this.props.addHome(this.state.homeAddress);
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <div>
        <h2>Set Your Home Address</h2>
        <button onClick={this.getLocation}>Use Current Location</button>
        <p>No loading component so just wait ... takes around 5 seconds.</p>
        {this.state.latitude && this.state.longitude ? (
          <div>
            <h3>Home Address</h3>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
            <p>Home Address: {this.state.homeAddress}</p>
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${googleMapsConfig.apiKey}`}
              alt="home address on a map"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default SetHomeLocation;
