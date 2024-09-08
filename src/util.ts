export function kelvinToCelsius(kelvin: number): number {
  const temp = (kelvin - 273.15).toFixed(2);
  return parseFloat(temp);
}

export function logWeatherData(
  weatherData: Weather,
  mainData: WeatherMain,
): void {
  console.log();
  console.log();
  console.log();
  console.log(
    `Weather feels like ${weatherData.main}, can be described as ${weatherData.description}`,
  );
  console.log(`Temperature is: ${kelvinToCelsius(mainData.temp)}°C`);
  console.log(`Humidity is: ${mainData.humidity}%`);
  console.log();
  console.log();
  console.log();
}
