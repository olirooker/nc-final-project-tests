import axios from 'axios';
import { getToken } from './test-token';

const route = () => {
  getToken().then((token) => {
    axios
      .get(
        'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log(response);
      });
  });
};

export { route };
