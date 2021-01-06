import React, { Component } from 'react';

import HPlatform, {
  HMap,
  HMapRoute,
  HMapMarker,
  HMapPolyLine,
  HMapGeoCode,
} from 'react-here-map';

const NewMap = () => {
  const center = { lat: 53.4808, lng: -2.24 };
  const destination = { lat: 53.4, lng: -2.24 };
  const markerCoords = center;

  const markerIcon =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

  const routeParams = {
    // The routing mode:
    mode: 'fastest;pedestrian',
    // The start point of the route:
    waypoint0: `geo!${center.lat},${center.lng}`,
    // The end point of the route:
    waypoint1: `geo!${destination.lat},${destination.lng}`,
    // To retrieve the shape of the route we choose the route
    // representation mode 'display'
    representation: 'display',
  };
  const routeLineOptions = {
    style: { strokeColor: 'blue', lineWidth: 10 },
    arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 },
  };

  const RouteMarker = ({ map, platform, ui, route, key, routeShape }) => {
    // Retrieve the mapped positions of the requested waypoints:
    const startPoint = route.waypoint[0].mappedPosition;
    const endPoint = route.waypoint[1].mappedPosition;

    // Create a marker for the start point:
    const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
    // Create a marker for the end point:
    const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

    return (
      <React.Fragment>
        <HMapPolyLine points={routeShape} map={map} setViewBounds />
        <HMapMarker
          coords={startMarker}
          map={map}
          platform={platform}
          icon={markerIcon}
          setViewBounds
        />
        <HMapMarker
          coords={endMarker}
          map={map}
          platform={platform}
          icon={markerIcon}
          setViewBounds
        />
      </React.Fragment>
    );
  };

  return (
    <HPlatform
      app_id='uKFp4S6JFSVOrzrGPXd1'
      app_code='fhEZVsaL95ncaMpUiM1YZgtXuU6bP8ocEj1esQBWyqk'
      apikey='fhEZVsaL95ncaMpUiM1YZgtXuU6bP8ocEj1esQBWyqk'
      useCIT
      interactive
      useHTTPS
      includeUI
      includePlaces
    >
      <HMap
        style={{
          height: '400px',
          width: '800px',
        }}
        mapOptions={{
          center: center,
          zoom: 14,
          pixelRatio: window.devicePixelRatio || 1,
        }}
      >
        <HMapMarker
          coords={markerCoords}
          icon={markerIcon}
          objectEvents={{
            pointerdown: (e) => console.log('Marker Pointer Down', e),
          }}
        />
        <HMapRoute
          routeParams={routeParams}
          icon={markerIcon}
          defaultDisplay
          lineOptions={routeLineOptions}
        >
          {RouteMarker}
        </HMapRoute>
      </HMap>
    </HPlatform>
  );
};

export default NewMap;
