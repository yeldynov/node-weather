const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=e1107f4de6c9fd4452d939c0cc652c34&query=${address}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to geocoding service!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};

module.exports = geocode;
