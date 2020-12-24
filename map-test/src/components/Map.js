import * as React from 'react';
import { route, getToken } from './api';
import Marker from './Marker';
import { FaMapMarker } from 'react-icons/fa';
import 'here-js-api/scripts/mapsjs-service';

class Map extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null,
  };

  componentDidMount() {
    const center = { lat: 53.4808, lng: -2.24 };
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: 'fhEZVsaL95ncaMpUiM1YZgtXuU6bP8ocEj1esQBWyqk',
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: center,
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    // const icon = new H.map.Icon(<FaMapMarker />);
    // const coords = center;
    // const marker = new H.map.Marker(coords, { icon: icon });
    // this.mapRef.addObject(marker);

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return (
      <div ref={this.mapRef} style={{ height: '500px', width: '800px' }} />
    );
  }
}

export default Map;
