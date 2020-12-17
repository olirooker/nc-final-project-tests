const request = require('request');

const OAUTH_URL = 'https://account.api.here.com/oauth2/token';
const KEY_ID = 'Rb-NkdXxmTS475P_-Gzedw';
const KEY_SECRET =
  'KmWV8nZZQiKVe9xkd9xBemBx-mSJDUgX1ZgredBbGNJFTHCFs-na0TGD7LaCIvJIc0vfOInDumVXHpcxUCxRGg';

const getToken = () => {
  const promise = new Promise((resolve, reject) => {
    request.post(
      {
        url: OAUTH_URL,
        oauth: {
          consumer_key: KEY_ID,
          consumer_secret: KEY_SECRET,
          signature_method: 'HMAC-SHA256'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          grant_type: 'client_credentials'
        }
      },
      (e, r, body) => {
        if (e) reject(e);
        else {
          const result = JSON.parse(body).access_token;
          resolve(result);
        }
      }
    );
  });
  return promise;
};

module.exports = { getToken };
