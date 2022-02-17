const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoiamFpbWUwNTExIiwiYSI6ImNrem10N2hvdjJycjAydm8wMjRnemgwYnUifQ.v0KNRM_CvNRGkjqIwqFcUw`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Invalid search term", undefined);
    } else if (response.body.message) {
      callback("Unable to find location", undefined);
    } else {
      const {
        center: [longitude, latitude],
        place_name: location,
        context,
      } = response.body.features[0];
      const newContext = () => {
        for (let a of context) {
          if (a["id"].includes("country")) {
            return a.short_code;
          }
        }
      };
      callback(undefined, {
        latitude,
        longitude,
        location,
        countryCode: newContext(),
      });
    }
  });
};
module.exports = geocode;
