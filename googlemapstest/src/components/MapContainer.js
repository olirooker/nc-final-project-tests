import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  static defaultProps = {
    center: { lat: 53.4808, lng: -2.2462 },
    zoom: 12,
  };
  mapStyles = {
    width: '80%',
    height: '80%',
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={this.mapStyles}
          initialCenter={{
            lat: 53.4808,
            lng: -2.2462,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={'center'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC7qV9kdOaPE1VtixpR2clHPkTATkUPMwk',
})(MapContainer);
