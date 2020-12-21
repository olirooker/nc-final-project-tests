import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Marker = () => <FaMapMarkerAlt size={25} />;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBNKR38a3FOfus_igrtAI3Sno-1jE2WP0g' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={59.955413} lng={30.337844} text='My Marker' />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
