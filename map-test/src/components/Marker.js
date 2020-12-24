import * as React from 'react';

const Marker = () => {
  const markerCenter = {
    lat: 53.4808,
    lng: -2.2426,
  };
  return (
    <div className='marker' {...markerCenter}>
      <div class='circle-marker' />
    </div>
  );
};

export default Marker;
