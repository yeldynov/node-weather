const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e35c618a0ca5688adfaa7cc08a208d7c&query=${lat},${lng}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degress out. The humidity is ${body.current.humidity}, pressure - ${body.current.pressure}, wind speed - ${body.current.wind_speed}`
      );
    }
  });
};

module.exports = forecast;
