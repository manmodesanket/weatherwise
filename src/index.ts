#!/usr/bin/env node
import dotenv from "dotenv";
import { prompt } from "enquirer";

import fetchLatLngWeatherData from "./coordinates";
import fetchCityWeatherData from "./place";

dotenv.config();

const apiKey: string = process.env.API_KEY as string;

const init = async () => {
  try {
    const { choice }: { choice: string } = await prompt({
      type: "select",
      name: "choice",
      message:
        "Would you like to enter a name of the place or latitude and longitude?",
      choices: ["Place", "Latitude and Longitude"],
    });

    if (choice === "Latitude and Longitude") {
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
    } else if (choice === "Place") {
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
  } catch (error) {
    console.error("Error:", error);
  }
};

init();
