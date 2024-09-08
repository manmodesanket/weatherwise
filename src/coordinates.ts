import axios, { AxiosError } from "axios";
import { logWeatherData } from "./util";

const fetchLatLngWeatherData = async (
  lat: number,
  lon: number,
  apiKey: string,
): Promise<void> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    const weatherData: Weather = response.data.weather[0];
    const mainData: WeatherMain = response.data.main;
    logWeatherData(weatherData, mainData);
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      console.log("Error fetching weather data", message);
    } else {
      console.log("Error fetching weather data");
    }
  }
};

export default fetchLatLngWeatherData;
