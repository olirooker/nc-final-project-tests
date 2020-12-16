import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leafet';
const Map = () => {
  const here = {
    id: 'uKFp4S6JFSVOrzrGPXd1',
    code: 'fhEZVsaL95ncaMpUiM1YZgtXuU6bP8ocEj1esQBWyqk',
  };

  async function onMapClick() {
    //We will write code in here later...
  }
  return (
    <>
      <div id='control'>
        <h3>Seattle Drinking Fountains Routing</h3>
        <p>Starting position</p>
        <input type='text' value='701 Pike St Seattle' id='start'></input>
        <button id='change-start'>Change</button>
        <p>Routing options</p>
        <form id='routing-mode' action=''>
          <input
            type='radio'
            name='routing-mode'
            id='walking'
            value='pedestrian'
            checked
          >
            {' '}
            Walking
          </input>
          <input type='radio' name='routing-mode' id='driving' value='car'>
            {' '}
            Driving
          </input>
        </form>
        <button id='clear'>Clear polylines</button>
      </div>
      <MapContainer
        center={[47.608013, -122.335167]}
        zoom={13}
        layers={[
          Tangram.leafletLayer({
            scene: 'scene.yaml',
            events: {
              click: onMapClick,
            },
          }),
        ]}
        scrollWheelZoom={true}
      />
    </>
  );
};

export default Map;
