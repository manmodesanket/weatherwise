#!/usr/bin/env node
import dotenv from "dotenv";
import { prompt } from "enquirer";

import fetchLatLngWeatherData from "./coordinates";
import fetchCityWeatherData from "./place";
import fetchForecastWeatherData from "./forecast";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

const apiKey: string = process.env.API_KEY as string;

const init = async () => {
  try {
    // Prompt the user to choose between entering a place name or latitude and longitude and forecast
    const { choice }: { choice: string } = await prompt({
      type: "select",
      name: "choice",
      message:
        "I can tell you some weather information. Would you like to enter a name of the place, co-ordinates OR co-ordinates for forecast?",
      choices: [
        "Place",
        "Co-ordinates",
        "Forecast (5 days) using co-ordinates",
      ],
    });

    // If the user chooses to enter Co-ordinates
    if (choice === "Co-ordinates") {
      const response: CoordinatesInput = await prompt([
        {
          type: "input",
          name: "lat",
          message: "Enter latitude:",
          validate(value) {
            const lat = parseFloat(value);
            if (isNaN(lat) || lat < -90 || lat > 90) {
              return "Please enter a valid latitude between -90 and 90.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "lng",
          message: "Enter longitude:",
          validate(value) {
            const lng = parseFloat(value);
            if (isNaN(lng) || lng < -180 || lng > 180) {
              return "Please enter a valid longitude between -180 and 180.";
            }
            return true;
          },
        },
      ]);

      fetchLatLngWeatherData(response.lat, response.lng, apiKey);
    }
    // If the user chooses to enter a place name
    else if (choice === "Place") {
      const { place }: { place: string } = await prompt({
        type: "input",
        name: "place",
        message: "Enter the place name:",
        validate(value) {
          if (!value) {
            return "City name cannot be empty.";
          }
          return true;
        },
      });
      fetchCityWeatherData(place, apiKey);
    }
    // If the user chooses to see forecast
    else if (choice === "Forecast (5 days) using co-ordinates") {
      const response: CoordinatesInput = await prompt([
        {
          type: "input",
          name: "lat",
          message: "Enter latitude:",
          validate(value) {
            const lat = parseFloat(value);
            if (isNaN(lat) || lat < -90 || lat > 90) {
              return "Please enter a valid latitude between -90 and 90.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "lng",
          message: "Enter longitude:",
          validate(value) {
            const lng = parseFloat(value);
            if (isNaN(lng) || lng < -180 || lng > 180) {
              return "Please enter a valid longitude between -180 and 180.";
            }
            return true;
          },
        },
      ]);
      fetchForecastWeatherData(response.lat, response.lng, apiKey);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

init();
