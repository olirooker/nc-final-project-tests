import axios from 'axios';

const getToken = () => {
  axios.get('https://account.api.here.com/oauth2/token', {});
};

const route = () => {
  axios
    .get(
      'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary',
      {
        headers: {
          Authorization: {
            'Auth-Service-Id': 'here_app',
            'Auth-Identifier': 'uKFp4S6JFSVOrzrGPXd1',
            'Auth-Secret':
              'HdksOE349TaVXjoOEX0r2WJzLZTZeEy9mjSSoEc2yyixanaGaOCUdu74bovAIzSbfGCqDn9ufJxg7zTGQxuO_A'
          }
        }
      }
    )
    .then((response) => {
      console.log(response);
    });
};

export { route };
