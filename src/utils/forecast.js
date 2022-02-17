const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=63dc7a754671f19c812cba113d9289b2&query=${lat},${lon}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the network", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(
        undefined,
        `${weather_descriptions} .It is currently ${temperature} °C but it feels like ${feelslike} °C`
      );
    }
  });
};
module.exports = forecast;
