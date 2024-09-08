interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface CoordinatesInput {
  lat: number;
  lng: number;
}

interface Forecast {
  main: WeatherMain;
  weather: Weather[];
  dt_txt: string;
}
