const { Component } = require('react');
const {
  Rectangle,
  Marker,
  Circle,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} = require('@react-google-maps/api');

class NewMapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: 'WALKING',
      origin: '',
      destination: '',
      zoom: 8,
      center: { lat: 53.4808, lng: -2.2462 },
      allowGPS: false,
      enableGPSMessage: false,
      bounds: {}
    };
  }
  // check if site GPS permission allowed. if yes, render map.
  componentDidMount() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        // console.log('GRANTED');
        this.setLocation();
      } else {
        this.setState({ enableGPSMessage: true });
        // console.log('NOT GRANTED');
      }
    });
  }

  // set users current location as map center
  setLocation = () => {
    //change to watchPosition for live tracking
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        allowGPS: true,
        enableGPSMessage: false,
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        bounds: new window.google.maps.LatLngBounds(
          { lat: 54, lng: -2 },
          { lat: 53.4808, lng: -1 }
        )
      });

      console.log(this.state.bounds, 'bounds');
      console.log(
        this.state.bounds.contains(
          new window.google.maps.LatLng(53.801277, -1.548567)
        ),
        'inside'
      );
      console.log(
        this.state.bounds.contains(
          new window.google.maps.LatLng(37.7942635, -122.3955861)
        ),
        'outside'
      );
    });
  };

  // sets state with response from google directions service
  directionsCallback = (response) => {
    // console.log(response, '<<<RESPONSE');

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response
        }));
      } else {
        // console.log('response: ', response);
      }
    }
  };

  //   watch what is entered into fields
  getOrigin = (ref) => {
    this.origin = ref;
  };

  getDestination = (ref) => {
    this.destination = ref;
  };

  // submits origin and destination  to directions service
  onClick = () => {
    if (this.origin.value === '') {
      this.setState(() => ({
        origin: this.state.center,
        destination: this.destination.value
      }));
    } else {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value
      }));
    }
  };

  onMapClick = (...args) => {
    // console.log('onClick args: ', args);
  };

  // checks if permission has been granted, if yes, re render with map and set center
  permissionClick = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        // console.log('GRANTED');
        this.setLocation();
      }
    });
  };

  render() {
    const options = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 5000,
      zIndex: 1
    };
    const locations = [
      // { lat: 53.4808, lng: -2.2462 },
      { lat: 54, lng: -2 },
      // { lat: 53, lng: -2 },
      { lat: 53.4808, lng: -1 }
    ];
    const modeNightStyle = [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ];

    // let bounds = new window.google.maps.LatLngBounds(
    //   locations[0],
    //   locations[1]
    // );

    return (
      <div className='map'>
        <div className='map-settings'>
          <hr className='mt-0 mb-3' />

          <div className='row'>
            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='ORIGIN'>Origin</label>
                <br />
                <input
                  id='ORIGIN'
                  className='form-control'
                  type='text'
                  ref={this.getOrigin}
                  placeholder='current location'
                />
              </div>
            </div>

            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='DESTINATION'>Destination</label>
                <br />
                <input
                  id='DESTINATION'
                  className='form-control'
                  type='text'
                  ref={this.getDestination}
                />
              </div>
            </div>
          </div>

          <button
            className='btn btn-primary'
            type='button'
            onClick={this.onClick}
          >
            Build Route
          </button>
        </div>
        <div className='map-container'>
          <GoogleMap
            // required
            id='direction-example'
            // required
            mapContainerStyle={{
              height: '600px',
              width: '80%'
            }}
            options={{
              styles: modeNightStyle
            }}
            // required
            zoom={this.state.zoom}
            // required
            center={this.state.center}
            // optional
            onClick={this.onMapClick}
            // optional
            onLoad={(map) => {
              // console.log('DirectionsRenderer onLoad map: ', map);
            }}
            // optional
            onUnmount={(map) => {
              // console.log('DirectionsRenderer onUnmount map: ', map);
            }}
          >
            {locations.map((location, id) => {
              return <Circle key={id} center={location} options={options} />;
            })}
            <Rectangle bounds={this.state.bounds} />
            <Marker position={this.state.center} />
            {this.state.destination !== '' && this.state.origin !== '' && (
              <DirectionsService
                // required
                options={{
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode
                }}
                // required
                callback={this.directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  // console.log(
                  //   'DirectionsService onLoad directionsService: ',
                  //   directionsService
                  // );
                }}
                // optional
                onUnmount={(directionsService) => {
                  // console.log(
                  //   'DirectionsService onUnmount directionsService: ',
                  //   directionsService
                  // );
                }}
              />
            )}

            {this.state.response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: this.state.response
                }}
                // optional
                onLoad={(directionsRenderer) => {
                  // console.log(
                  //   'DirectionsRenderer onLoad directionsRenderer: ',
                  //   directionsRenderer
                  // );
                }}
                // optional
                onUnmount={(directionsRenderer) => {
                  // console.log(
                  //   'DirectionsRenderer onUnmount directionsRenderer: ',
                  //   directionsRenderer
                  // );
                }}
              />
            )}
          </GoogleMap>
          )}
        </div>
      </div>
    );
  }
}
export default NewMapContainer;
