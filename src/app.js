const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../hbs-templates/views");
const partialPath = path.join(__dirname, "../hbs-templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "William" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "William" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "You have reached the help page",
    title: "Help",
    name: "William",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      Error: "Please enter a valid address",
    });
  }
  geocode(
    address,
    (error, { latitude, longitude, location, countryCode } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast,
          countryCode,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404Page", {
    errorMessage: "Help article not found",
    title: "Error 404",
    name: "William",
  });
});
app.get("*", (req, res) => {
  res.render("404Page", {
    errorMessage: "Page Not Found",
    title: "Error 404",
    name: "William",
  });
});
app.listen(port, () => {
  console.log("server is running and listening on port " + port);
});
