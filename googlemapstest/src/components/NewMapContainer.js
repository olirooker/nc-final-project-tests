const { Component } = require('react');
const {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} = require('@react-google-maps/api');
const ScriptLoaded = require('@react-google-maps/api').default;

class NewMapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: 'WALKING',
      origin: '',
      destination: '',
      zoom: 16,
      center: { lat: 53.4808, lng: -2.2462 },
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      console.log(' Available');
      //change to watchPosition for live tracking
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      console.log('Not Available - please turn on GPS');
    }
  }

  directionsCallback = (response) => {
    console.log(response, '<<<RESPONSE');

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log('response: ', response);
      }
    }
  };

  getOrigin = (ref) => {
    this.origin = ref;
  };

  getDestination = (ref) => {
    this.destination = ref;
  };

  onClick = () => {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  };

  onMapClick = (...args) => {
    console.log('onClick args: ', args);
  };

  render() {
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
          <LoadScript googleMapsApiKey='AIzaSyC7qV9kdOaPE1VtixpR2clHPkTATkUPMwk'>
            <GoogleMap
              // required
              id='direction-example'
              // required
              mapContainerStyle={{
                height: '600px',
                width: '80%',
              }}
              // required
              zoom={this.state.zoom}
              // required
              center={this.state.center}
              // optional
              onClick={this.onMapClick}
              // optional
              onLoad={(map) => {
                console.log('DirectionsRenderer onLoad map: ', map);
              }}
              // optional
              onUnmount={(map) => {
                console.log('DirectionsRenderer onUnmount map: ', map);
              }}
            >
              {this.state.destination !== '' && this.state.origin !== '' && (
                <DirectionsService
                  // required
                  options={{
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: this.state.travelMode,
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  onLoad={(directionsService) => {
                    console.log(
                      'DirectionsService onLoad directionsService: ',
                      directionsService
                    );
                  }}
                  // optional
                  onUnmount={(directionsService) => {
                    console.log(
                      'DirectionsService onUnmount directionsService: ',
                      directionsService
                    );
                  }}
                />
              )}

              {this.state.response !== null && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: this.state.response,
                  }}
                  // optional
                  onLoad={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onLoad directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                  // optional
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onUnmount directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
  }
}
export default NewMapContainer;
