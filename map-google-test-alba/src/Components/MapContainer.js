import React, { Component } from 'react';
import {
  Polygon,
  Map,
  Circle,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Polyline,
  DirectionsRenderer
} from 'google-maps-react';
import CurrentLocation from './Map';

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {} // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];
    const coords = { lat: 25.774, lng: -80.19 };

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={coords} />
        {/* {triangleCoords.map((coords) => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              name={coords}
              position={coords}
            />
          );
        })} */}
        {/* {triangleCoords.map((coords) => {
          return (
            <Circle
              radius={120000}
              center={coords}
              onMouseover={() => console.log('mouseover')}
              onClick={() => console.log('click')}
              onMouseout={() => console.log('mouseout')}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            />
          );
        })} */}
        {/* <Polygon
          paths={triangleCoords}
          strokeColor='#0000FF'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#0000FF'
          fillOpacity={0.35}
        /> */}
        {/* <Polyline
          path={triangleCoords}
          strokeColor='#0000FF'
          strokeOpacity={0.8}
          strokeWeight={2}
        /> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
      //   <Map
      //     google={this.props.google}
      //     style={{ width: '100%', height: '100%', position: 'relative' }}
      //     className={'map'}
      //     zoom={14}
      //   >
      //     {triangleCoords.map((coords) => {
      //       return (
      //         <Marker
      //           onClick={this.onMarkerClick}
      //           name={coords}
      //           position={coords}
      //         />
      //       );
      //     })}
      //     {/* <Polyline
      //       path={triangleCoords}
      //       strokeColor='#0000FF'
      //       strokeOpacity={0.8}
      //       strokeWeight={2}
      //     /> */}
      //   </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBNKR38a3FOfus_igrtAI3Sno-1jE2WP0g'
})(MapContainer);
