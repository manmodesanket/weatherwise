#!/usr/bin/env node
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { prompt } from "enquirer";

dotenv.config();

const apiKey: string = process.env.API_KEY as string;

const init = async () => {
  try {
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

    console.log(`Latitude: ${response.lat}, Longitude: ${response.lng}`);
    fetchWeatherData(response.lat, response.lng);
  } catch (error) {
    console.error("Error:", error);
  }
};

const fetchWeatherData = async (lat: number, lon: number): Promise<void> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    const weatherData: Weather = response.data.weather[0];
    console.log();
    console.log();
    console.log();
    console.log(
      `Weather feels like ${weatherData.main}, can be described as ${weatherData.description}`,
    );
    console.log();
    console.log();
    console.log();
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      console.log("Error fetching weather data", message);
    } else {
      console.log("Error fetching weather data");
    }
  }
};

init();
