import axios, { AxiosError } from "axios";
import { logWeatherData } from "./util";

const fetchForecastWeatherData = async (
  lat: number,
  lon: number,
  apiKey: string,
): Promise<void> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    const foreCastData: Forecast[] = response.data.list;
    foreCastData.forEach((item) => {
      const weatherData: Weather = item.weather[0];
      const mainData: WeatherMain = item.main;
      logWeatherData(weatherData, mainData, item.dt_txt);
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      console.log("Error fetching weather data", message);
    } else {
      console.log("Error fetching weather data");
    }
  }
};

export default fetchForecastWeatherData;
