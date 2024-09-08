export function kelvinToCelsius(kelvin: number): number {
  const temp = (kelvin - 273.15).toFixed(2);
  return parseFloat(temp);
}

export function logWeatherData(
  weatherData: Weather,
  mainData: WeatherMain,
  date?: string,
): void {
  console.log();
  console.log();
  console.log();
  console.log(date ? `Weather data for ${formatDate(date)} UTC` : "");
  console.log(
    `Weather feels like ${weatherData.main}, can be described as ${weatherData.description}`,
  );
  console.log(`Temperature is: ${kelvinToCelsius(mainData.temp)}°C`);
  console.log(`Humidity is: ${mainData.humidity}%`);
  console.log();
  console.log();
  console.log();
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
