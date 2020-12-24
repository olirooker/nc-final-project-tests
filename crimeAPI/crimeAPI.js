const Axios = require('axios');

// current location
const latLng = { lat: 53.4808, lng: -2.2462 };

// base URL
const crimeApi = Axios.create({
  baseURL: `https://data.police.uk/api`,
});

// crime category array
const types = ['robbery', 'violent-crime', 'other-crime'];

// call to API using crime category, and position. returns reports within 1 mile, for 1 month period. defaults to last month

const getCrimesByLocation = async (lat, lng, type) => {
  const data = await crimeApi.get(
    `/crimes-street/${type}?&lat=${lat}&lng=${lng}&date=2020-01`
  );
  // map over response to produce array of crime locations
  const locations = data.data.map((crime) => {
    return { lat: crime.location.latitude, lng: crime.location.longitude };
  });
  console.log(locations, `<<<locations of ${type} crimes`);
  return locations;
};

// get crimes by category
const getCrimesByCategory = async () => {
  const data = await crimeApi.get(`/crime-categories?date=2020-012`);
  return data.data;
};

const crimesArray = types.map((type) => {
  return getCrimesByLocation(latLng.lat, latLng.lng, type);
});

console.log(crimesArray, '<<<<crimes');

getCrimesByCategory();
console.log(
  '######################################################################################################'
);
